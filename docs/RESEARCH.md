# Hồ sơ kỹ thuật và kế hoạch xác minh

Ngày kiểm tra: 18/10/2026 (Asia/Saigon). Phạm vi: ba URL người dùng cung cấp, chuẩn hóa bỏ tham số theo dõi; không bổ sung mẫu khác hoặc coi mẫu tương tự là đúng SKU. URL gốc được giữ trong site/data.json.

## Điều đã xác minh được và giới hạn

1. Đã đọc ba trang bán và xem ảnh chính bằng trình duyệt. Giá đang hiển thị: H255 22,8 triệu; Core320 22,4 triệu; 16c 20 triệu. Đây là dữ liệu niêm yết, không phải giao dịch hoặc tồn kho đã xác nhận.
2. Ảnh chính cả ba có cụm số bên phải, viền màn đen/tối, kê tay xám, phím tối. Không chứng minh bố cục, màu, vật liệu hoặc đèn nền của hàng thực. H255 có ảnh phụ màu sáng khác ảnh chính; phải hỏi đúng màu bán. Mặt B sáng theo nghĩa màu viền khác với màn hình có độ sáng cao.
3. Nguồn AMD H255 xác nhận Zen4/8C16T/780M; AMD Ryzen7 170 xác nhận Zen3+/8C16T/680M. Không tìm thấy chứng cứ từ các nguồn đã đọc cho tên “170HS” trên hàng shop. Không kết luận chip giả hoặc shop gian lận; yêu cầu nhận dạng BIOS/CPU-Z.
4. Intel Core5 320 là Series3/Wildcat Lake/2P+4LPE/6C6T, không phải i5 thế hệ3. Không suy tốc độ Excel từ số nhân hoặc TDP.
5. Lenovo có SKU tham chiếu H255 83QH0005CD và AK-83QH0004CD; 16c AHP10 83K800DNCD; wiki SE Core320. Các nguồn cho pin50Wh; chưa có MTM hàng shop để gán sang sản phẩm được giao. Không dùng pin Pro14/16 hoặc IdeaPad quốc tế khác.

## Các mâu thuẫn phải giải quyết

| Mẫu | Nội dung cần làm rõ | Cách xác minh |
|---|---|---|
| H255 | 313,4 × 222 mm không khớp màn16 inch16:10 được ghi | Tính vùng hiển thị ngang: 16×25,4×16/√(16²+10²)≈344,6mm; xin bản vẽ/manual và đo máy |
| H255 | USB-C Gen2 nhưng ghi20Gbps / Thunderbolt4 | Manual đúng MTM, chứng nhận nếu có và thử dock/cáp; không tự sửa thành USB4 |
| H255 | “Rút gọn, không led” so với ảnh có numpad | Ảnh keyboard hàng thực, thử tổ hợp bật đèn, kiểm tra SKU |
| 16c | Tên/ảnh16 nhưng bảng14 inch | Tem MTM, EDID, kích thước vùng hiển thị; chưa chọn một giá trị là đúng |
| 16c | “170HS” so với AMD Ryzen7 170 | BIOS, CPU-Z và thông tin SKU từ Lenovo |
| 16c | “DDR5X 5600 / 8hàn+8rời” | Manual, SPD và ảnh khe/bo mạch; không tự khẳng định DDR5X là cấu hình thật |
| Cả ba | “Rút gọn” so với ảnh có numpad | Ghi nhận ảnh là evidence quảng cáo, không khẳng định hàng giao |

Nguồn địa chỉ không nhất quán: nội dung trích xuất ban đầu trang H255 ghi Rose Town79 Ngọc Hồi; hai trang còn lại và chính sách ghi sảnhB Bluegem Tower, Thanh Trì. Không suy đoán địa điểm đang hoạt động hoặc khoảng cách từ nhà người dùng. Gọi xác nhận địa chỉ, giờ tiếp nhận và người chịu trách nhiệm trước khi đến.

## Bảo hành và hỗ trợ

[Chính sách shop](https://trieubom.com/chinh-sach-bao-hanh-san-pham/) ghi máy12tháng, pin/sạc6tháng; màn hình thay khi nhiều hơn3điểm chết theo điều kiện trang; lỗi người dùng gây ra bị loại. Lỗi nhẹ có thể xử lý VN, lỗi nặng có thể gửi về TQ; shop chịu phí hai chiều. Không thấy SLA tối đa, máy mượn hoặc đổi mới dài hạn trong trang đã đọc. Không đồng nhất lời khẳng định của shop về bảo hành các hãng với chính sách chính thức của từng hãng.

[Lenovo China IWS](https://consumerservice.lenovo.com.cn/iws.html) cần tra serial và quốc gia mua China Mainland; không mặc định một Xiaoxin sẽ được nhận tại Việt Nam. Chưa có serial nên không kết luận có hoặc không có IWS cho ba máy cụ thể. Muốn bảo hành độc lập cửa hàng: phải có kết quả tra serial và xác nhận từ Lenovo VN về nơi tiếp nhận, quyền lợi, pin/sạc và phụ phí. Đưa serial qua kênh riêng, không commit lên GitHub.

## Ma trận quyết định có điều kiện

- Nếu ưu tiên giá niêm yết thấp: 16c là ứng viên cần kiểm tra đầu tiên về giá; chưa xác nhận giá trị sử dụng vì màn hình/CPU/RAM còn mâu thuẫn.
- Nếu ưu tiên khối lượng niêm yết: SE/16c cùng1,68kg, nhẹ hơn H2551,81kg đúng130g theo shop. Chưa có cân cả sạc hoặc kích thước đủ để kết luận gọn hơn khi mang đi.
- Nếu ưu tiên màn thông số cao: shop ghi H255120Hz/100%sRGB; chỉ coi là hướng cần xác nhận panel, không coi máy dễ nhìn nhất hoặc tốt nhất cho Excel.
- Nếu ưu tiên pin: không xếp hạng. Wh không phải giờ; TDP CPU không phải công suất trung bình toàn máy.
- Nếu bảo hành trực tiếp Lenovo VN là bắt buộc: cả ba còn thiếu bằng chứng bắt buộc. Không chốt mua chỉ vì điểm sở thích cao.

## Quy trình đo đề xuất (chưa thực hiện)

| Hạng mục | Ghi nhận cần có | Điều kiện phải giữ |
|---|---|---|
| Excel | Refresh PowerQuery, CalculateFullRebuild, thời gian mở/lưu, median3lần sau warmup | Cùng workbook đã bỏ thông tin cá nhân, bản Excel/bitness/addin, RAM, nguồn điện, power mode |
| Kế toán | Phần mềm và phiên bản thực dùng, dữ liệu mẫu, tốc độ thao tác và tương thích in/chữ ký số | Tác vụ và phụ kiện giống nhau; không dùng dữ liệu khách hàng thật để public |
| RAM | Working set/commit/paging, số khe, tốc độ effective, dual-channel | Kiểm tra manual/MTM, SPD và áp lực nhớ lúc đồng thời Excel/browser/phần mềm kế toán |
| Pin | Thời gian và battery report đầu/cuối, full-charge/design capacity, mức pin | Cùng độ sáng đo được hoặc ghi rõ mức,60Hz nếu có,cùng WiFi/tải nền/power mode; không trộn video test và office test |
| Trọng lượng | Máy+sạc+dây/túi nếu dùng, độ dày/ngang/dọc | Cùng cân và cách cân; phân biệt khối lượng thân máy với hành lý |
| Nhập số | Độ rộng numpad,0/dấu thập phân/Enter,đèn nền,đọc chữ và kê tay | Người dùng cuối nhập thử5–10phút trong ánh sáng văn phòng |
| Màn | PanelID, độ sáng, scaling,cỡ chữ, góc nhìn/chống chói; PWM nếu đo được | Không lấy100%sRGB làm điểm cho khả năng đọc chữ |
| Bảo hành | Kết quả IWS, xác nhận Lenovo VN và cam kết cửa hàng | Đúng serial; ghi ngày, đơn vị, SLA, chi phí, vận chuyển, dữ liệu/backup |

Chưa có mẫu workbook nên không cam kết16GB đủ mọi nghiệp vụ. Yêu cầu báo giá32GB nếu tải thực chứng minh cần; tổng sau nâng/Office/phụ kiện phải vẫn dưới23triệu. Khoảng dư trước phụ phí theo niêm yết: H255 dưới0,2triệu; SE dưới0,6triệu;16c dưới3triệu. Vì trần là “dưới”, cộng đúng các khoản này sẽ chạm23triệu và bị loại.

## Phương pháp điểm

Mô hình sở thích minh bạch, không phải benchmark hoặc bằng chứng mua hàng. Giá quan sát là đầu vào đã biết; khối lượng chỉ được dùng nếu người xem bật chấp nhận số shop. Chấm ngoại hình1–5 là ý kiến người xem. Các tiêu chí thiếu dữ liệu có khoảng0–100 theo trọng số; không tự điền50. Mọi trọng số chuẩn hóa theo tổng; tổng0 trả trạng thái không có điểm. Không công bố người thắng nếu khoảng chồng lấn hoặc thiếu điều kiện bắt buộc. Ngưỡng cân nặng dùng như cảnh báo có điều kiện bởi số cân còn chưa xác minh.

## Ảnh và nguồn

- H255: https://trieubom.com/wp-content/uploads/2026/01/11111.png
- SE: https://trieubom.com/wp-content/uploads/2026/09/se2.jpg
- 16c: https://trieubom.com/wp-content/uploads/2026/02/1w.jpg

Ảnh được tải nguyên bản để trang không phụ thuộc hotlink. Các thông tin nguồn và đường dẫn hãng được lưu ở site/data.json; tuyệt đối không diễn giải SKU tham chiếu là serial hàng thật. Website là báo cáo độc lập, không phải quảng cáo được hãng/cửa hàng phê duyệt.
