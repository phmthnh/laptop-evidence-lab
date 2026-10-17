export const clamp = (n, a=0, b=100) => Math.max(a, Math.min(b,n));
export const defaults = {price:20,weight:25,battery:25,appearance:15,warranty:10,upgrade:5};
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
  return data.products.flatMap(p=>Object.entries(p.claims).map(([field,c])=>({data:{claim_id:p.id+':'+field,product:p.name,field,claim:c.text,evidence_status:c.status,source:c.source,checked_at:data.checkedAt,review_prompt:'Đối chiếu đúng MTM/serial; ghi URL hoặc phép đo, không dùng mẫu tương tự.'}})));
}
