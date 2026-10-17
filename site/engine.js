export const clamp = (n, a=0, b=100) => Math.max(a, Math.min(b,n));
export const defaults = {price:20,weight:20,battery:20,appearance:20,warranty:20,upgrade:20};
export function interval(product, weights, {seller=false,appearance=null}={}) {
  const sum=Object.values(weights).reduce((a,b)=>a+Math.max(0,Number(b)||0),0);
  if(!sum) return {low:0,high:100,coverage:0,empty:true};
  const scores={price:clamp((23000000-product.price.value)/5000000*100),weight:seller?clamp((2.2-product.weight.value)/.9*100):null,battery:null,appearance:Number.isFinite(appearance)?clamp(appearance*20):null,warranty:null,upgrade:null};
  let low=0,unknown=0,known=0;
  for(const [key,w0] of Object.entries(weights)) {const w=Math.max(0,Number(w0)||0);const s=scores[key];if(Number.isFinite(s)){low+=s*w;known+=w;}else unknown+=w;}
  return {low:low/sum,high:(low+100*unknown)/sum,coverage:100*known/sum,empty:false};
}
export function eligibility(p,{budget=23,extra=0,maxWeight=2.2,direct=false}={}) {
  const total=p.price.value+extra*1000000;
  if(total<18000000||total>=23000000||total>budget*1000000) return {state:'excluded',reason:'Tổng chi phí ngoài ngân sách đã chọn (trần tuyệt đối < 23 triệu).'};
  if(p.weight.value>maxWeight)return {state:'conditional',reason:'Cân nặng cửa hàng ghi vượt ngưỡng; cần cân đúng máy.'};
  return {state:'pending',reason:direct?'Chưa có bằng chứng bảo hành trực tiếp Lenovo Việt Nam cho serial này.':'Chờ xác nhận numpad trên hàng thật, pin thực tế và điều kiện bảo hành.'};
}
export function decisiveWinner(items) {
  if(items.length<2||items.some(x=>x.eligibility!=='pass'||x.score.empty))return null;
  return items.find(x=>items.every(y=>x.id===y.id||x.score.low>y.score.high))?.id??null;
}
export function batteryScenario(wh,watts,usable=.9) {return wh>0&&watts>0&&usable>0&&usable<=1?wh*usable/watts:null;}
export function labelTasks(data) {
  const sources=new Map((data.sources||[]).map(s=>[s.id,s]));
  return data.products.flatMap(p=>Object.entries(p.claims).map(([field,c])=>{
    const refs=[...new Set(c.sources||[c.source])].map(id=>({id,url:sources.get(id)?.url||id,kind:sources.get(id)?.kind||'unknown'}));
    const listed=({price:p.price?.value,weight:p.weight?.value,memory:p.listingSpecs?.memoryGB,ssd:p.listingSpecs?.ssdGB,battery:p.listingSpecs?.batteryWh})[field];
    const unit=({price:'VND',weight:'kg',memory:'GB',ssd:'GB',battery:'Wh'})[field];
    return {data:{claim_id:p.id+':'+field,product:p.name,field,claim:c.text,evidence_status:c.status,source:refs.map(s=>s.url).join('\n'),sources:refs,checked_at:data.checkedAt,data_version:data.version||1,...(Number.isFinite(listed)?{listed_value:listed,listed_unit:unit}:{}),review_prompt:`Đối chiếu đúng MTM/serial; ghi URL hoặc phép đo, không dùng mẫu tương tự. ${field==='battery'?`Dung lượng công bố: ${listed??'chưa rõ'} Wh; chưa đo giờ sử dụng, không quy đổi Wh thành thời lượng thực tế.`:'Số cửa hàng, ảnh quảng cáo và SKU hãng tham chiếu chưa xác nhận chiếc máy được giao.'}`}};
  }));
}
