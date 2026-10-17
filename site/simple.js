// Everyday language for the basic view. Product facts remain in data.json.
export const helpText = {
  price:['Giá máy','Đây là giá cửa hàng đang ghi trên web, chưa gồm khoản bạn tự thêm. Hãy hỏi tổng tiền phải trả, gồm nâng cấp, phần mềm và phụ kiện nếu cần.'],
  weight:['Mang đi có nặng không?','Số kg này là cân nặng thân máy do cửa hàng công bố. Khi đi làm, bạn còn mang sạc và dây. Nếu mang hằng ngày, nên cầm thử cả bộ trước khi chọn.'],
  memory:['RAM — chỗ để làm việc','Hãy hình dung RAM như mặt bàn: bạn mở Excel, phần mềm kế toán và nhiều tab cùng lúc thì cần thêm chỗ. Cả ba được ghi 16 GB; muốn biết có dùng thoải mái không, hãy thử đúng những file bạn hay làm.'],
  ssd:['SSD — chỗ cất tài liệu','SSD giống chiếc tủ đựng file, ảnh và phần mềm. Cả ba được ghi 512 GB. Windows và ứng dụng cũng dùng chỗ này, nên dung lượng trống sẽ ít hơn con số ghi trên máy.'],
  battery:['Dung lượng pin là gì?','50 Wh là lượng điện pin chứa, không phải 50 giờ dùng. Thời gian còn tùy độ sáng và việc bạn làm. Hiện chưa có bài thử giống nhau để nói máy nào lâu hết pin hơn.'],
  keyboard:['Bàn phím số là gì?','Đó là cụm phím 0–9 nằm bên phải, giống cách bố trí trên máy tính để bàn. Nếu nhập số kế toán nhiều, hãy gõ thử để xem tay có thoải mái không. Ảnh cả ba máy có cụm này; vẫn cần xem máy thật.'],
  display:['Màn hình: ưu tiên nhìn chữ dễ','Với bảng tính, hãy xem chữ có dễ đọc và có thấy đủ cột không. Hz nói về độ mượt khi cuộn, nit nói về độ sáng, sRGB nói về màu sắc; không con số nào tự bảo đảm bạn nhìn sẽ thoải mái.'],
  warranty:['Máy lỗi thì mang đến đâu?','Cần biết ai nhận sửa, ở đâu và chờ bao lâu. Shop ghi máy 12 tháng, pin và sạc 6 tháng; lỗi nặng có thể gửi về Trung Quốc. Chưa xác nhận bạn tự mang tới Lenovo Việt Nam sẽ được nhận bảo hành.'],
  cpu:['CPU — bộ phận xử lý công việc','CPU giúp máy tính toán và chạy phần mềm. Bạn không cần nhớ tên chip: hãy quan tâm file Excel của mình mở, tính và lưu có nhanh không. Chưa có bài thử giống nhau để xếp hạng ba máy cho công việc của bạn.'],
  appearance:['Nhìn thích, gõ dễ, mang vừa túi','Hãy nhìn màu máy và chữ trên phím dưới ánh sáng phòng làm việc. Ảnh có thể khác màu thực tế. Điểm kiểu dáng bên dưới là cảm nhận của bạn, không phải điểm chất lượng.'],
  upgrade:['Nâng cấp là gì?','Sau này bạn có thể muốn thêm chỗ làm việc (RAM) hoặc chỗ cất file (SSD). Không phải máy nào cũng thay thêm được; cần cửa hàng xác nhận đúng chiếc máy và báo tổng tiền trước.']
};
export function helpButton(key){if(!helpText[key])return '';return `<button type="button" class="spec-help-trigger" data-help="${key}" aria-label="Giải thích: ${helpText[key][0]}" aria-controls="spec-help" aria-expanded="false">?</button>`;}
export function simpleCell(p,field){
 const cells={price:`${(p.price.value/1e6).toLocaleString('vi-VN')} triệu`,weight:`${p.weight.value.toLocaleString('vi-VN')} kg theo cửa hàng`,battery:`${p.listingSpecs.batteryWh} Wh theo cửa hàng · chưa đo giờ dùng thực tế`,keyboard:'Có trong ảnh · cần thử máy thật',memory:`${p.listingSpecs.memoryGB} GB theo cửa hàng${p.claims.memory.status==='conflict'?' · loại RAM/cách nâng chưa rõ':''}`,ssd:`${p.listingSpecs.ssdGB} GB theo cửa hàng`,display:p.claims.display.status==='conflict'?'Cần hỏi lại kích thước màn hình':'Cửa hàng ghi 16 inch · nên nhìn thử chữ',warranty:'Máy 12 tháng qua shop · pin/sạc 6 tháng'};
 return cells[field];
}
export function installHelp(){
 const popup=document.createElement('aside');popup.id='spec-help';popup.className='spec-help-popup';popup.hidden=true;popup.setAttribute('role','dialog');popup.setAttribute('aria-label','Giải thích thông số');
 popup.innerHTML='<button type="button" class="help-close" aria-label="Đóng giải thích">×</button><small>HIỂU ĐƠN GIẢN</small><h3></h3><p></p>';
 document.body.append(popup);let timer,leaveTimer,active;
 function hide(restore=false){const previous=active;popup.hidden=true;active?.setAttribute('aria-expanded','false');active=null;if(restore)previous?.focus({preventScroll:true});clearTimeout(timer);clearTimeout(leaveTimer);}
 function show(button){if(!button.isConnected||!helpText[button.dataset.help])return;hide();active=button;const [title,body]=helpText[button.dataset.help];popup.querySelector('h3').textContent=title;popup.querySelector('p').textContent=body;popup.hidden=false;button.setAttribute('aria-expanded','true');
  const rect=button.getBoundingClientRect(),box=popup.getBoundingClientRect();const left=Math.max(12,Math.min(innerWidth-box.width-12,rect.left-20));let top=rect.bottom+12;if(top+box.height>innerHeight-12)top=Math.max(12,rect.top-box.height-12);popup.style.left=left+'px';popup.style.top=top+'px';
 }
 function schedule(button){clearTimeout(timer);clearTimeout(leaveTimer);timer=setTimeout(()=>show(button),2000);}
 document.addEventListener('pointerover',e=>{const b=e.target.closest('[data-help]');if(b&&e.pointerType!=='touch'&&!b.contains(e.relatedTarget))schedule(b);if(popup.contains(e.target))clearTimeout(leaveTimer);});
 document.addEventListener('pointerout',e=>{const b=e.target.closest('[data-help]');if(b&&!b.contains(e.relatedTarget)){clearTimeout(timer);if(!popup.contains(e.relatedTarget))leaveTimer=setTimeout(()=>hide(),220);}if(popup.contains(e.target)&&!popup.contains(e.relatedTarget)&&!active?.contains(e.relatedTarget))leaveTimer=setTimeout(()=>hide(),220);});
 document.addEventListener('focusin',e=>{const b=e.target.closest('[data-help]');if(b)schedule(b);});
 document.addEventListener('focusout',e=>{if(e.target.closest('[data-help]')&&!popup.contains(e.relatedTarget)){clearTimeout(timer);leaveTimer=setTimeout(()=>hide(),220);}});
 document.addEventListener('click',e=>{const b=e.target.closest('[data-help]');if(b){if(active===b)hide();else show(b);}else if(!popup.contains(e.target))hide();});
 document.addEventListener('keydown',e=>{if(e.key==='Escape')hide(true);});
 popup.querySelector('button').onclick=()=>hide(true);window.addEventListener('scroll',()=>hide(),true);window.addEventListener('resize',()=>hide());
 return hide;
}

// Compatibility for tabs that still have the previous unversioned app cached.
export const needs={balanced:['Tôi muốn cân bằng','Xem giá, cân nặng và bàn phím; pin và bảo hành cần xác nhận.'],carry:['Tôi hay mang máy đi làm','Cần cân cả máy và sạc.'],battery:['Tôi muốn ít phải cắm sạc','Chưa có số giờ dùng thực tế.'],numbers:['Tôi nhập số, dùng Excel nhiều','Cần thử bằng file Excel thường dùng.'],value:['Tôi muốn tiết kiệm chi phí','So sánh giá niêm yết và xác nhận đúng cấu hình.']};
