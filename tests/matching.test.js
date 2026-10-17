import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import{needOptions,needPacks,toggleNeedPack,normalizeNeeds,compareNeeds}from'../site/matching.js';
const {products}=JSON.parse(fs.readFileSync(new URL('../site/data.json',import.meta.url),'utf8'));
test('multiple selections are retained and each has one explanation per product',()=>{
 const keys=Object.keys(needOptions),r=compareNeeds(products,keys);
 assert.equal(keys.length,18);
 for(const row of r.rows){assert.equal(row.reasons.length,keys.length);assert.equal(row.favorable+row.tradeoffs+row.unknown,keys.length);assert.deepEqual(row.reasons.map(x=>x.key),keys);}
});
test('unknown battery and warranty never yield a suggested winner',()=>{
 const r=compareNeeds(products,['battery','direct','quiet']);
 assert.deepEqual(r.shortlist,[]);assert.equal(r.definitiveWinner,null);
 assert.ok(r.rows.every(x=>x.unknown===3&&x.favorable===0));
});
test('combining price and carry gives conditional reasons, not a purchase verdict',()=>{
 const r=compareNeeds(products,['value','carry']);
 assert.deepEqual(r.shortlist,['r170']);assert.equal(r.definitiveWinner,null);
 assert.equal(r.rows[0].favorable,2);
});
test('tied evidence is preserved instead of inventing a tie breaker',()=>{
 const r=compareNeeds(products,['numbers']);assert.equal(r.shortlist.length,3);
});
test('exact 23 million including extras excludes a product from shortlist',()=>{
 const r=compareNeeds(products,['value','carry'],{extra:3});assert.ok(r.rows.every(x=>x.excluded));assert.deepEqual(r.shortlist,[]);
});
test('empty selection and unrecognized inputs have no recommendation',()=>{
 assert.deepEqual(normalizeNeeds(['carry','carry','__proto__',null]),['carry']);
 const r=compareNeeds(products,[]);assert.deepEqual(r.shortlist,[]);assert.ok(r.rows.every(x=>x.reasons.length===0));
});
test('personal appearance is identified as user opinion',()=>{
 const r=compareNeeds(products,['appearance'],{ratings:{core320:5}});
 assert.deepEqual(r.shortlist,['core320']);assert.equal(r.rows[0].reasons[0].source,null);
 assert.match(r.rows[0].reasons[0].text,/sở thích cá nhân/);
});
test('screen conflict remains unknown rather than claiming large screen fits',()=>{
 const r=compareNeeds(products,['bigscreen']);const c=r.rows.find(x=>x.product.id==='r170');assert.equal(c.reasons[0].status,'unknown');
});

test('explicit main priority narrows all-needs tie without inventing evidence',()=>{const keys=Object.keys(needOptions);assert.equal(compareNeeds(products,keys).shortlist.length,3);assert.deepEqual(compareNeeds(products,keys,{priority:'value'}).shortlist,['r170']);assert.deepEqual(compareNeeds(products,keys,{priority:'smooth'}).shortlist,['h255']);assert.equal(compareNeeds(products,keys,{priority:'battery'}).priorityApplied,false);assert.equal(compareNeeds(products,keys,{priority:'value'}).definitiveWinner,null);});
test('priority cannot promote an excluded machine or an unselected need',()=>{const keys=Object.keys(needOptions);const r=compareNeeds(products,keys,{priority:'value',extra:3});assert.deepEqual(r.shortlist,[]);assert.equal(r.priorityApplied,false);assert.deepEqual(compareNeeds(products,['numbers'],{priority:'value'}).shortlist,['h255','core320','r170']);});

test('ten scenario packs use valid needs and combine without duplicates',()=>{assert.equal(needPacks.length,10);for(const p of needPacks)assert.deepEqual(normalizeNeeds(p.items),p.items);let selected=toggleNeedPack([],'accounting');selected=toggleNeedPack(selected,'mobile');assert.equal(selected.length,9);selected=toggleNeedPack(selected,'excelwork');assert.equal(new Set(selected).size,selected.length);assert.ok(selected.includes('numbers')&&selected.includes('battery')&&selected.includes('storage'));});
test('pack toggles preserve unrelated needs and partial packs can be completed',()=>{let selected=toggleNeedPack(['carry','numbers'],'mobile');assert.ok(selected.includes('numbers'));assert.equal(selected.filter(k=>needPacks.find(p=>p.id==='mobile').items.includes(k)).length,4);selected=toggleNeedPack(selected,'mobile');assert.deepEqual(selected,['numbers']);assert.deepEqual(toggleNeedPack(selected,'missing'),selected);});
