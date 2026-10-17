// Compare selected needs against the evidence snapshot, not assumed performance.
export const needGroups = [
  {title:'Mang theo & sự thoải mái',items:[
    ['carry','Tôi muốn mang máy nhẹ hơn','Thường mang từ nhà tới công ty.'],
    ['compact','Tôi cần máy gọn, vừa túi','Không muốn chiếc máy chiếm nhiều chỗ.'],
    ['battery','Tôi muốn ít phải cắm sạc','Hay ngồi xa ổ điện hoặc mang máy đi họp.'],
    ['quiet','Tôi muốn máy êm, ít nóng','Ngồi làm lâu, không thích tiếng quạt lớn.']]},
  {title:'Công việc kế toán',items:[
    ['numbers','Tôi nhập số nhiều','Muốn có cụm phím số bên phải.'],
    ['excel','Tôi dùng file Excel nặng','Nhiều công thức, dữ liệu hoặc báo cáo.'],
    ['multitask','Tôi mở nhiều việc cùng lúc','Excel, phần mềm kế toán và nhiều tab web.'],
    ['storage','Tôi lưu nhiều tài liệu','File công việc, ảnh và dữ liệu qua nhiều năm.']]},
  {title:'Nhìn, gõ & ngoại hình',items:[
    ['bigscreen','Tôi muốn màn hình rộng','Muốn nhìn được nhiều cột bảng tính.'],
    ['readability','Tôi cần nhìn chữ dễ, ít chói','Ngồi đọc và nhập liệu nhiều giờ.'],
    ['smooth','Tôi thích cuộn trang mượt','Hay cuộn bảng tính và trang web.'],
    ['appearance','Tôi quan tâm kiểu dáng','Muốn chọn chiếc mình thấy đẹp.'],
    ['clean','Tôi thích máy sáng, dễ giữ sạch','Quan tâm màu phím, kê tay và dấu vân tay.']]},
  {title:'Chi phí & dùng lâu dài',items:[
    ['value','Tôi muốn tiết kiệm tiền mua máy','Ưu tiên mức giá thấp hơn trong ba mẫu.'],
    ['upgrade','Tôi muốn nâng cấp về sau','Có thể cần thêm RAM hoặc chỗ lưu file.'],
    ['direct','Tôi muốn bảo hành trực tiếp tại hãng','Muốn tự mang tới Lenovo Việt Nam.'],
    ['nearby','Tôi cần nơi hỗ trợ dễ tới ở Hà Nội','Muốn rõ địa chỉ nhận máy và thời gian sửa.'],
    ['ports','Tôi hay cắm thêm thiết bị','Màn hình ngoài, máy in, chuột hoặc bộ chia cổng.']]}
];
export const needOptions=Object.fromEntries(needGroups.flatMap(g=>g.items.map(([id,label,hint])=>[id,{label,hint}])));
export const defaultNeeds=['carry','battery','numbers','value','direct'];
export function normalizeNeeds(input){return Array.isArray(input)?[...new Set(input.filter(x=>typeof x==='string'&&Object.hasOwn(needOptions,x)))]:[];}
export function explainNeed(p,key,products,rating){
  const record=(status,text,source=p.shop)=>({key,label:needOptions[key].label,status,text,source});
  const money=n=>(n/1e6).toLocaleString('vi-VN');
  switch(key){
    case 'carry':{const lightest=Math.min(...products.map(x=>x.weight.value));return p.weight.value===lightest?record('favorable',`Shop ghi ${p.weight.value.toLocaleString('vi-VN')} kg, cùng mức nhẹ nhất trong ba mẫu. Chưa tính sạc và chưa cân máy thật.`):record('tradeoff',`Shop ghi ${p.weight.value.toLocaleString('vi-VN')} kg, hơn mẫu nhẹ nhất khoảng ${Math.round((p.weight.value-lightest)*1000)} g. Cần cầm thử cả máy và sạc.`);}
    case 'value':{const cheapest=Math.min(...products.map(x=>x.price.value));return p.price.value===cheapest?record('favorable',`Giá web ${money(p.price.value)} triệu, thấp nhất trong ba mẫu. Giá thấp chưa bảo đảm dùng hợp; cấu hình vẫn cần đối chiếu.`):record('tradeoff',`Giá web ${money(p.price.value)} triệu, cao hơn mẫu rẻ nhất ${money(p.price.value-cheapest)} triệu. Chưa có bằng chứng phần chênh này làm công việc của bạn nhanh hơn.`);}
    case 'numbers':return record('favorable','Ảnh có cụm phím số bên phải, đúng kiểu bố trí bạn đang tìm. Cần thử bàn phím hàng thật; ảnh chưa chứng minh gõ thoải mái.');
    case 'bigscreen':return p.claims.display.status==='conflict'?record('unknown','Tên và ảnh ghi 16 nhưng bảng ghi 14 inch. Cần hỏi đúng kích thước trước khi biết có đủ rộng cho bạn.'):record('favorable','Cửa hàng ghi màn 16 inch, đúng hướng màn lớn bạn muốn. Hãy mở bảng tính để xem chữ và số cột có vừa mắt.');
    case 'smooth':return p.id==='h255'?record('favorable','Shop ghi 120 Hz, cao hơn mức 60 Hz trên hai trang còn lại: có tín hiệu thuận lợi cho việc cuộn mượt. Cần xác nhận đúng màn trên máy giao.'):record('tradeoff',`Shop ghi 60 Hz${p.claims.display.status==='conflict'?', nhưng thông tin màn còn mâu thuẫn':''}. Con số thấp hơn 120 Hz niêm yết của H255; chưa có thử nghiệm cảm giác thực tế.`);
    case 'appearance':if(Number.isInteger(rating)&&rating>=4)return record('favorable',`Bạn tự chấm kiểu dáng ${rating}/5: đây là chiếc bạn thấy hợp mắt. Điểm này là sở thích cá nhân, không xác nhận chất lượng.`,null);if(Number.isInteger(rating)&&rating<=2)return record('tradeoff',`Bạn tự chấm kiểu dáng ${rating}/5, nên cân nhắc nếu ngoại hình quan trọng với bạn.`,null);return record('unknown',rating===3?'Bạn chấm kiểu dáng 3/5, chưa cho thấy thích rõ mẫu này. Có thể xem ảnh lớn và đánh giá lại.':'Bạn chưa chấm kiểu dáng. Chọn “Xem nhanh” để nhìn ảnh và cho biết bạn thích đến mức nào.',null);
    case 'battery':return record('unknown','Được ghi pin 50 Wh, nhưng chưa có số giờ làm việc thực tế. Không thể biết máy này giúp bạn ít cắm sạc hơn mẫu nào.');
    case 'compact':return record('unknown','Chưa có bộ kích thước đáng tin cậy cho đúng máy. Số kg không cho biết máy có vừa túi của bạn.');
    case 'quiet':return record('unknown','Chưa đo tiếng quạt, nhiệt bàn phím và vùng kê tay khi làm việc. Chưa biết có êm và mát khi bạn dùng lâu.');
    case 'excel':return record('unknown','Chưa thử cùng file Excel của bạn. Tên chip hoặc số nhân chưa đủ để kết luận tính toán nhanh và không bị chờ.',p.claims.cpu.source);
    case 'multitask':return record('unknown','Shop ghi RAM 16 GB. Chưa thử mở đồng thời các ứng dụng của bạn nên chưa xác nhận có chạy thoải mái.');
    case 'storage':return record('unknown','Shop ghi SSD 512 GB. Cần biết lượng file bạn đang có và sẽ lưu thêm; chưa thể khẳng định đủ dùng nhiều năm.');
    case 'readability':return record('unknown','Chưa thử độ dễ đọc chữ và độ chói dưới ánh sáng nơi bạn làm. Màu đẹp hoặc nhiều Hz không bảo đảm nhìn lâu thoải mái.');
    case 'clean':return record('unknown','Ảnh có viền màn tối, kê tay xám và phím tối. Chưa thử bám vân tay hay nhìn màu thật; chưa bảo đảm sáng và dễ giữ sạch.');
    case 'upgrade':return record('unknown','Shop có ghi nâng RAM được, nhưng chưa xác nhận khe và giới hạn của đúng máy. Cần báo giá nâng cấp trước khi mua.');
    case 'direct':return record('unknown','Chưa có xác nhận Lenovo Việt Nam nhận bảo hành chiếc máy này. Bảo hành qua shop không đồng nghĩa tự mang đến hãng được nhận.','warranty');
    case 'nearby':return record('unknown','Nguồn địa chỉ cửa hàng chưa nhất quán; chưa xác minh nơi nhận máy, giờ làm và thời gian sửa. Chưa thể gọi là dễ tiếp cận với bạn.','warranty');
    case 'ports':return record('unknown','Có cổng kết nối được shop liệt kê, nhưng chưa thử cùng màn hình, máy in hoặc bộ chia bạn dùng. Cần kiểm tra đúng thiết bị trước.');
    default:throw Error('Unknown need');
  }
}
export function compareNeeds(products,selected,{budget=23,extra=0,ratings={}}={}){
  const keys=normalizeNeeds(selected);
  const rows=products.map(p=>{const reasons=keys.map(k=>explainNeed(p,k,products,ratings[p.id]));const total=p.price.value+extra*1e6;return {product:p,reasons,total,excluded:total<18e6||total>=23e6||total>budget*1e6,favorable:reasons.filter(r=>r.status==='favorable').length,tradeoffs:reasons.filter(r=>r.status==='tradeoff').length,unknown:reasons.filter(r=>r.status==='unknown').length};});
  rows.sort((a,b)=>Number(a.excluded)-Number(b.excluded)||b.favorable-a.favorable);
  const eligible=rows.filter(r=>!r.excluded),top=Math.max(0,...eligible.map(r=>r.favorable));
  const shortlist=top>0?eligible.filter(r=>r.favorable===top).map(r=>r.product.id):[];
  // Never a definitive winner: shop figures/photos are conditional, mandatory facts unverified.
  return {keys,rows,shortlist,definitiveWinner:null};
}
