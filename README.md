# Lựa máy · Laptop Evidence Lab

Website so sánh ba Lenovo Xiaoxin cho công việc kế toán, có bản **Dễ hiểu dành cho Hà Anh** và bản **Chuyên sâu**. Người xem chọn nhu cầu, xem máy nên tìm hiểu trước và đối chiếu từng thông số với nguồn.

**[Mở website](https://phmthnh.github.io/laptop-evidence-lab/)** · [Dễ hiểu](https://phmthnh.github.io/laptop-evidence-lab/?view=simple) · [Chuyên sâu](https://phmthnh.github.io/laptop-evidence-lab/?view=expert)

Hồ sơ nguồn kiểm tra ngày **18/10/2026 (Asia/Saigon)**. Trang không tự cập nhật giá hoặc xác nhận tồn kho.

## Ba mẫu đang so sánh

| Mẫu | CPU trong hồ sơ | Giá niêm yết | Khối lượng công bố | Pin công bố |
| --- | --- | ---: | ---: | ---: |
| Xiaoxin 16 · 2025 | Ryzen 7 H 255 | 22,8 triệu | 1,81 kg | 50 Wh |
| Xiaoxin 16 SE · 2026 | Core 5 320 | 22,4 triệu | 1,68 kg | 50 Wh |
| Xiaoxin 16c · 2025 | Shop ghi “170HS”; cần xác nhận | 20 triệu | 1,68 kg | 50 Wh |

Các con số trên do cửa hàng công bố, chưa kiểm tra hàng giao; khối lượng chưa tính sạc. Nguồn shop/hãng và trạng thái từng thông số ở [site/data.json](site/data.json). Ngân sách là **18 đến dưới 23 triệu đồng**, gồm phụ phí người xem nhập; đúng 23 triệu bị loại.

## Bản dễ hiểu

1. Chọn nhiều trong **10 nhóm gợi ý**: kế toán, mang đi, văn phòng, Excel nhiều việc, đi họp, kiểu dáng, đọc/nhập liệu, thiết bị ngoài, chi phí và dùng lâu/bảo hành.
2. Chỉnh từng ô trong **18 tiêu chí thuộc 4 nhóm**. Các nhóm cộng dồn; tiêu chí trùng chỉ tính một lần. Dấu ✓ là nhóm đủ tiêu chí, dấu − là chọn một phần. Bấm nhóm đã đủ để bỏ tiêu chí của nhóm; nhóm có tiêu chí chung cũng cập nhật theo.
3. Xem **Gợi ý dành cho Hà Anh**: ảnh, tên máy, lý do, điều cần hỏi và link cửa hàng. Chọn **một điều quan trọng nhất** để thu hẹp danh sách nếu cần.
4. Mục thiết kế: mở ảnh lớn và chọn **Ít hợp / Bình thường / Thích mẫu này**. Thao tác này thêm tiêu chí kiểu dáng vào gợi ý; đánh giá là sở thích cá nhân.
5. Xem lý do đầy đủ, bảo hành và ba việc nên thử trước khi mua.

Gợi ý nhanh là nút nhỏ; rê chuột, đặt tiêu điểm hoặc chạm nút để xem mô tả bên dưới. Dấu **?** mở giải thích sau khoảng 2 giây khi rê chuột/đặt tiêu điểm; bấm hoặc chạm mở ngay. Escape, nút × hoặc bấm ngoài để đóng.

## Bản chuyên sâu và phương pháp

Bảng **12 hạng mục/máy** phân biệt nguồn hãng, SKU tham chiếu, shop, ảnh, mâu thuẫn và thông tin chưa biết. Có sáu trọng số, bộ lọc chi phí/khối lượng, tải JSON/checklist/task và đọc annotation cục bộ.

Bản dễ hiểu đếm điểm thuận lợi có điều kiện theo nhu cầu. Nếu có ưu tiên chính, xét trước máy trong ngân sách có điểm thuận lợi ở tiêu chí đó, rồi so tổng. Thiếu dữ liệu phân biệt thì web thông báo; ngang nhau giữ đồng hạng.

Bản chuyên sâu chuẩn hóa trọng số, giữ khoảng 0–100 cho tiêu chí thiếu dữ liệu thay vì tự điền điểm trung tính. Số cân shop chỉ được chấm khi bật tùy chọn; ngoại hình dùng điểm tự đánh giá. Hai chế độ cùng nguồn nhưng khác phương pháp, không phải hai bảng xếp hạng tương đương.

Công cụ pin minh họa `50 Wh × 90% / công suất trung bình toàn máy`, không phải số đo hoặc dự báo pin sản phẩm. Xem [hồ sơ kỹ thuật và kế hoạch kiểm chứng](docs/RESEARCH.md).

## Reset, lưu lựa chọn và dữ liệu riêng

Mỗi lần mở/tải lại hoặc phục hồi trang từ bộ nhớ quay lại của trình duyệt đều reset: chưa chọn nhu cầu, chưa chấm ngoại hình, sáu trọng số bằng nhau, chưa bật nhận cân nặng shop hay bắt buộc bảo hành trực tiếp.

- **Lưu trên trình duyệt:** lưu localStorage; chỉ áp dụng lại khi bấm **Nạp bản đã lưu**.
- **Link ưu tiên:** chứa lựa chọn trong URL. Mở vẫn trung lập; bấm **Áp dụng lựa chọn từ link** nếu muốn dùng.
- Chuyển chế độ trong cùng phiên giữ lựa chọn. **Đặt lại** đưa về mặc định.
- Không có tài khoản hoặc mã analytics trên website. Annotation nhập chỉ đọc cục bộ, không tự sửa dữ liệu công khai.
- `.private/` chứa bộ nhớ riêng, runtime, database, sao lưu và ghi chú; bị Git bỏ qua. Không commit mật khẩu, token, serial hoặc annotation riêng.

## Label Studio và Codex

[Hướng dẫn thiết lập, đồng bộ và review](integrations/label-studio/README.md)

Project cục bộ: [Laptop Evidence Lab · project 1](http://127.0.0.1:8080/projects/1/data/). URL chỉ dùng trên máy chạy Label Studio; người xem GitHub Pages không cần nó.

**36 task = 3 máy × 12 thông số**. Task có ID ổn định, nội dung, trạng thái chứng cứ, toàn bộ URL đối chiếu, ngày kiểm tra, phiên bản dữ liệu và số công bố kèm đơn vị khi có. Pin 50 Wh được phân biệt với giờ dùng thực tế.

MCP riêng chỉ đọc hồ sơ/project/review. Script làm mới là công cụ ghi riêng: sao lưu trước, cập nhật task hiện có và kiểm tra giữ nguyên annotation, draft, prediction. **Không import lặp bộ task vào project đã có.** Nhãn review không tự trở thành bằng chứng hãng.

## Chạy cục bộ

HTML/CSS/JavaScript thuần; không cần build hoặc cài npm package. Dùng Node.js để kiểm tra (CI dùng Node 22), Python 3 để phục vụ HTTP:

```powershell
npm test
npm start
```

Mở [localhost:4173](http://127.0.0.1:4173/). Không mở qua `file://` vì trang đọc JSON bằng `fetch`.

Xuất và làm mới task, từ thư mục gốc repo:

```powershell
node scripts/export-tasks.mjs
python integrations/label-studio/refresh_local.py
python integrations/label-studio/refresh_local.py --apply
```

Python không có `--apply` chỉ kiểm tra sai khác; `--apply` mới ghi sau khi sao lưu. Đọc giới hạn schema trong README tích hợp trước khi dùng trên máy khác.

## Mã nguồn và xuất bản

| Đường dẫn | Vai trò |
| --- | --- |
| `site/data.json` | Hồ sơ 3 máy, nguồn và 36 thông số |
| `site/app.js`, `simple.js` | Giao diện và giải thích |
| `site/matching.js` | 18 tiêu chí, 10 gợi ý nhanh và logic so nhu cầu |
| `site/engine.js`, `session.js` | Khoảng điểm, ngân sách, xuất task và reset |
| `site/style.css`, `personality.css`, `choice.css` | Bố cục, hồng/mận, con trỏ riêng, bộ chọn |
| `integrations/label-studio/` | Task và công cụ tích hợp |
| `docs/RESEARCH.md`, `tests/` | Phương pháp và kiểm tra logic |

Push `main` chạy [Test and publish Pages](.github/workflows/pages.yml): kiểm tra rồi triển khai **chỉ `site/`** lên Pages. README/công cụ ngoài `site/` lưu trên GitHub, không thành dịch vụ chạy trên web. Database/runtime Label Studio không triển khai. Khi đổi JS/CSS, cập nhật phiên bản URL tài nguyên nếu cần để tránh lẫn cache cũ.

## Giới hạn và tài nguyên

Gợi ý là máy nên tìm hiểu/đến thử, chưa xác nhận đáp ứng đầy đủ. Chưa có MTM/serial hàng giao, benchmark cùng điều kiện, đo pin/cả máy và sạc hoặc xác nhận Lenovo Việt Nam nhận bảo hành. Mâu thuẫn màn hình/CPU/RAM của 16c và kích thước/cổng của H255 vẫn cần làm rõ. **50 Wh không phải số giờ dùng.** Tên IdeaPad trên trang bán không chứng minh cùng SKU quốc tế.

Ảnh do Triệu Bôm đăng, dùng để đối chiếu ba mẫu đã chọn; không tuyên bố sở hữu hay quan hệ tài trợ. URL gốc ở hồ sơ nghiên cứu. Font Be Vietnam Pro/Playfair Display tải từ Google Fonts, có dự phòng hệ thống. Trang trí và con trỏ SVG không ảnh hưởng kết quả phân tích.
