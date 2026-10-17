"""Import/export a bounded Label Studio project; credentials stay in process env.
Official endpoints: /api/projects/, /api/projects/{id}/import, /api/projects/{id}/export.
"""
import argparse,json,os,sys,urllib.request,urllib.parse
from pathlib import Path

ROOT=Path(__file__).resolve().parents[2]
def main():
    p=argparse.ArgumentParser();p.add_argument('action',choices=['create','import','export','status']);p.add_argument('--project',type=int);p.add_argument('--output',default=str(ROOT/'.private/label-studio-export.json'));a=p.parse_args()
    base=os.environ.get('LABEL_STUDIO_URL','http://127.0.0.1:8080').rstrip('/')
    token=os.environ.get('LABEL_STUDIO_TOKEN');scheme=os.environ.get('LABEL_STUDIO_AUTH_SCHEME','Token')
    if not token:sys.exit('Set LABEL_STUDIO_TOKEN in the local process; never paste it into public website or Git.')
    parsed=urllib.parse.urlparse(base)
    if parsed.scheme!='https' and not(parsed.scheme=='http' and parsed.hostname in ['127.0.0.1','localhost','::1']):sys.exit('HTTPS required except loopback.')
    def request(endpoint,body=None):
        raw=None if body is None else json.dumps(body).encode();req=urllib.request.Request(base+endpoint,data=raw,headers={'Authorization':scheme+' '+token,'Content-Type':'application/json'})
        with urllib.request.urlopen(req,timeout=60)as r:return json.load(r)
    if a.action=='create':
        project=request('/api/projects/',{'title':'Laptop Evidence Lab','label_config':(ROOT/'site/label-config.xml').read_text(encoding='utf-8'),'description':'Review claims; reference SKU is not proof of delivered hardware.'})
        print(json.dumps({'project_id':project['id'],'url':base+'/projects/'+str(project['id'])+'/data/'}));return
    if not a.project or a.project<1:sys.exit('Provide --project ID. Reuse the existing ID; do not create duplicates.')
    if a.action=='import':result=request(f'/api/projects/{a.project}/import',json.loads((ROOT/'integrations/label-studio/tasks.json').read_text(encoding='utf-8')));print(json.dumps(result))
    elif a.action=='status':
        result=request(f'/api/projects/{a.project}/');print(json.dumps({k:result.get(k)for k in ['id','title','task_number','num_tasks_with_annotations']}))
    else:
        target=Path(a.output).resolve()
        if target.is_relative_to(ROOT/'site'):sys.exit('Annotation exports may contain private notes; do not export into public site/.')
        result=request(f'/api/projects/{a.project}/export?exportType=JSON&download_all_tasks=true');target.parent.mkdir(parents=True,exist_ok=True);target.write_text(json.dumps(result,ensure_ascii=False,indent=2),encoding='utf-8');print('Saved local annotation export:',target)
if __name__=='__main__':main()
