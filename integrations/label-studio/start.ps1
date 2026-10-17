$ErrorActionPreference = 'Stop'
$projectRoot = (Resolve-Path (Join-Path $PSScriptRoot '../..')).Path
$runtime = Join-Path $projectRoot '.private/labelstudio-venv/Scripts/label-studio.exe'
if (-not (Test-Path -LiteralPath $runtime)) { throw 'Install the local runtime following README.md first.' }
$env:LABEL_STUDIO_ANALYTICS_ENABLED = 'false'
& $runtime start --no-browser --internal-host 127.0.0.1 --port 8080 --data-dir (Join-Path $projectRoot '.private/labelstudio-data')
