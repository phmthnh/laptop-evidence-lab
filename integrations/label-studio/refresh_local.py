"""Explicit local-only refresh of existing task data; never import or delete tasks.

Bound to this checkout's Label Studio 1.23 database and project 1.
The read-only MCP bridge remains read-only. A full private SQLite backup is made
before mutation. Only task.data/updated_at are written; reviews are preserved.
"""
import argparse
import hashlib
import json
import sqlite3
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
DB = ROOT / '.private/labelstudio-data/label_studio.sqlite3'
TASKS = ROOT / 'integrations/label-studio/tasks.json'


def digest(rows):
    return hashlib.sha256(json.dumps(rows, ensure_ascii=False, sort_keys=True).encode()).hexdigest()


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--apply', action='store_true', help='Apply after backing up; default is audit only.')
    args = parser.parse_args()
    incoming = [x['data'] for x in json.loads(TASKS.read_text(encoding='utf-8'))]
    wanted = {x['claim_id']: x for x in incoming}
    if len(incoming) != 36 or len(wanted) != 36:
        raise ValueError('Expected exactly 36 unique exported claims.')
    with sqlite3.connect(DB.as_uri() + '?mode=rw', uri=True, timeout=30) as conn:
        project = conn.execute('SELECT title FROM project WHERE id=1').fetchone()
        if project != ('Laptop Evidence Lab',):
            raise ValueError('Project identity mismatch.')
        rows = conn.execute('SELECT id,data FROM task WHERE project_id=1 ORDER BY id').fetchall()
        current = {json.loads(raw)['claim_id']: (task_id, json.loads(raw)) for task_id, raw in rows}
        if len(rows) != 36 or len(current) != 36 or current.keys() != wanted.keys():
            raise ValueError('Task IDs differ; refusing create/delete/duplicate.')
        changed = [k for k, value in wanted.items() if any(current[k][1].get(f) != v for f, v in value.items())]
        # Include drafts, predictions, completion results and task counters in the preservation check.
        tables = ['task_completion', 'tasks_annotationdraft', 'prediction', 'task_comment_authors']
        def protected():
            snapshots = {t: conn.execute(f'SELECT * FROM {t} ORDER BY rowid').fetchall() for t in tables}
            snapshots['task_counters'] = conn.execute('SELECT id,is_labeled,total_annotations,cancelled_annotations,total_predictions FROM task WHERE project_id=1 ORDER BY id').fetchall()
            return digest(snapshots)
        before = protected()
        backup_path = None
        if args.apply and changed:
            folder = ROOT / '.private/backups'
            folder.mkdir(exist_ok=True)
            backup_path = folder / ('labelstudio-before-refresh-' + datetime.now(timezone.utc).strftime('%Y%m%dT%H%M%S%fZ') + '.sqlite3')
            with sqlite3.connect(backup_path) as backup:
                conn.backup(backup)
            conn.execute('BEGIN IMMEDIATE')
            try:
                # Recheck under the write lock so a concurrent edit is not overwritten.
                latest = conn.execute('SELECT id,data FROM task WHERE project_id=1 ORDER BY id').fetchall()
                if latest != rows or protected() != before:
                    raise ValueError('Project changed during audit; retry refresh.')
                for key in changed:
                    task_id, old = current[key]
                    merged = {**old, **wanted[key]}
                    conn.execute('UPDATE task SET data=?,updated_at=? WHERE id=? AND project_id=1',
                                 (json.dumps(merged, ensure_ascii=False), datetime.now(timezone.utc).strftime('%Y-%m-%d %H:%M:%S.%f'), task_id))
                if protected() != before:
                    raise ValueError('Review preservation check failed.')
                conn.commit()
            except Exception:
                conn.rollback()
                raise
        remaining = []
        for _, raw in conn.execute('SELECT id,data FROM task WHERE project_id=1'):
            actual = json.loads(raw)
            if any(actual.get(k) != v for k, v in wanted[actual['claim_id']].items()):
                remaining.append(actual['claim_id'])
        report = {'project_id': 1, 'tasks': len(rows), 'changed_claim_ids': changed,
                  'applied': args.apply, 'remaining_mismatches': remaining,
                  'reviews_preserved': protected() == before,
                  'backup': str(backup_path) if backup_path else None}
        if args.apply:
            (ROOT / '.private/labelstudio-refresh-report.json').write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding='utf-8')
        print(json.dumps(report, ensure_ascii=True))


if __name__ == '__main__':
    main()
