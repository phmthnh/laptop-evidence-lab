# Lựa máy · Laptop Evidence Lab

Website tiếng Việt so sánh ba Lenovo Xiaoxin, có hai chế độ **Dễ hiểu** và **Chuyên sâu**. Dữ liệu kiểm tra ngày **18/10/2026, Asia/Saigon**. Không chốt máy khi thiếu chứng cứ về pin thực tế, MTM hoặc bảo hành tại Việt Nam.

- Website: https://phmthnh.github.io/laptop-evidence-lab/
- Repo: https://github.com/phmthnh/laptop-evidence-lab
- Nguồn từng thông số: [site/data.json](site/data.json)
- Phương pháp và kế hoạch kiểm tra: [docs/RESEARCH.md](docs/RESEARCH.md)
- Label Studio / Codex: [integrations/label-studio/README.md](integrations/label-studio/README.md)

## Chạy cục bộ

Không cần build hoặc cài npm package. Node 18+ để chạy kiểm thử, Python 3 để phục vụ website:

```powershell
npm test
python -m http.server 4173 --directory site --bind 127.0.0.1
```

Mở http://127.0.0.1:4173. Không mở index.html bằng file:// vì website đọc JSON qua fetch.

## Tính năng

- So sánh ảnh quảng cáo, CPU/RAM/SSD/màn hình/cổng/pin/cân nặng/bảo hành; nguồn và mức xác minh riêng từng claim.
- Chỉnh trọng số, kịch bản mang đi/tiết kiệm, trần chi phí, phụ phí, ngưỡng cân nặng; tự chấm ngoại hình.
- Khoảng điểm thể hiện phần thiếu dữ liệu, không gán điểm trung tính cho unknown. Điều kiện bắt buộc chưa đạt thì không công bố máy thắng.
- Lưu ưu tiên trong localStorage, chia sẻ qua URL, tải JSON và checklist; không có tài khoản hoặc thu thập analytics.
- Công cụ giả định 50 Wh / công suất toàn máy; tuyệt đối không gọi đó là số đo pin của sản phẩm.
- Xuất task và cấu hình Label Studio; đọc annotation JSON cục bộ, không tự nâng mức tin cậy của chứng cứ.

## Xuất bản

GitHub Pages chỉ phục vụ thư mục `site/`. Workflow kiểm thử rồi deploy static artifact. `.private/` chứa yêu cầu riêng và runtime/dữ liệu cục bộ, luôn bị Git bỏ qua. Không có token trong mã nguồn hoặc website.

Ảnh sản phẩm do Triệu Bôm đăng, được dùng để đối chiếu mẫu người dùng chỉ định; không tuyên bố quyền sở hữu ảnh hoặc quan hệ tài trợ. URL ảnh gốc ở docs/RESEARCH.md. Font Be Vietnam Pro / Playfair Display tải từ Google Fonts; có font hệ thống dự phòng.

## Giới hạn

Chưa có MTM/serial hàng thực, benchmark cùng điều kiện, số đo pin, cân máy/sạc hoặc xác nhận tiếp nhận của Lenovo Việt Nam. Tên IdeaPad trên trang shop không chứng minh cùng SKU quốc tế. Giá niêm yết không xác nhận tồn kho hay giá cuối cùng. Trang không tự cập nhật giá hoặc chứng cứ.

Bản Dễ hiểu dành cho Hà Anh: chọn nhu cầu hằng ngày, kết quả bằng lời và bảng so sánh rút gọn. Dấu ? giải thích bằng ví dụ gần gũi sau2giây hover/focus; bấm/chạm mở ngay, Escape/nút×/chạmngoài để đóng. Bản Chuyên sâu giữ thông số, nguồn và công cụ tính điểm.
