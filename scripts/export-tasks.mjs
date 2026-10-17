import fs from 'node:fs';import path from 'node:path';import{fileURLToPath}from'node:url';import{labelTasks}from'../site/engine.js';
const root=path.dirname(path.dirname(fileURLToPath(import.meta.url))),data=JSON.parse(fs.readFileSync(path.join(root,'site/data.json'),'utf8')),sources=new Map(data.sources.map(s=>[s.id,s.url]));
const tasks=labelTasks(data).map(t=>({...t,data:{...t.data,source:sources.get(t.data.source)||t.data.source}}));
fs.writeFileSync(path.join(root,'integrations/label-studio/tasks.json'),JSON.stringify(tasks,null,2)+'\n');
console.log(`Exported ${tasks.length} claims; no fabricated annotations.`);
