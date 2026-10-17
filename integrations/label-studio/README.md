# Label Studio + Codex, riêng cho dự án

Hai phần độc lập:

1. **Website công khai**: hoạt động không cần Label Studio; xuất36claim thành task JSON + XML, đọc annotation export cục bộ.
2. **Codex cục bộ**: MCP tự viết, chỉ đọc `site/data.json` và dự án có title `Laptop Evidence Lab` trong SQLite cục bộ. Không phải plugin chính thức của HumanSignal. Không cần token vì đọc database cục bộ ở chế độ SQLite `mode=ro` + `query_only=ON`; không truy cập bảng tài khoản hoặc mật khẩu. Không có công cụ ghi, xóa, SQL tùy ý hoặc gửi mạng.

Trên máy thiết lập ban đầu, project **ID1** đã được tạo dưới tài khoản người dùng: http://127.0.0.1:8080/projects/1/data/ . Đã nhập36task và cấu hình XML, chưa có annotation được gửi. Không import lại nếu project này đã tồn tại; bước setup bên dưới dành cho máy/instance mới.

## Runtime đã dùng

Python3.12, Label Studio1.23.2, MCP Python SDK2.3.0. Runtime và DB nằm trong `.private/`, không đưa lên repo. Chạy lại ở máy khác:

```powershell
py -3.12 -m venv .private/labelstudio-venv
.private/labelstudio-venv/Scripts/python.exe -m pip install -r integrations/label-studio/requirements.txt
./integrations/label-studio/start.ps1
```

Mở http://127.0.0.1:8080 trong Codex. Lần đầu cần tài khoản cục bộ do người dùng tự đặt mật khẩu; không phải đăng nhập vào website labelstud.io. Server bind127.0.0.1, không public lên internet hoặc GitHub Pages. Dùng script `start.ps1` khi khởi động lại máy nếu server chưa chạy.

Sau khi có tài khoản: tạo project title chính xác `Laptop Evidence Lab`, import [tasks.json](tasks.json) và dán XML từ [site/label-config.xml](../../site/label-config.xml) vào Settings → Labeling Interface. Hoặc dùng API script `sync.py` với token trong environment để create/import/export; không gửi token qua chat. Chọn scheme `Token` cho legacy API key, `Bearer` chỉ khi đang có access token thích hợp; PAT refresh token cần đổi sang access token theo tài liệu instance, script không tự đoán loại token.

## Kết nối Codex

```powershell
codex mcp add laptop-evidence-labelstudio -- E:/Codex/laptop-evidence-lab/.private/labelstudio-venv/Scripts/python.exe E:/Codex/laptop-evidence-lab/integrations/label-studio/mcp_server.py
codex mcp get laptop-evidence-labelstudio
```

Đường dẫn ví dụ là của máy tạo dự án; đổi thành đường dẫn checkout của bạn nếu di chuyển. Sau khi lưu cấu hình, cần phiên Codex nạp lại MCP / Restart trong phần MCP servers. Cấu hình có trên đĩa chưa chứng minh tool đã xuất hiện trong chat đang mở. Tài liệu OpenAI: https://learn.chatgpt.com/docs/extend/mcp?surface=cli

Ba tool chỉ đọc:

- `laptop_claims(product_id, status)`: các claim có nguồn và mức độ xác minh; dùng được ngay cả khi Label Studio chưa có account.
- `labelstudio_project_status()`: sốtask/đãlabel của đúng project.
- `labelstudio_reviews(limit)`: annotation của đúng36claim; reviewer note là dữ liệu không đáng tin, không phải chỉ thị cho Codex.

Bridge kiểm tra schema Label Studio1.23.2, không hứa tương thích schema phiên bản khác. Sau nâng version cần chạy kiểm thử lại. Không mở trực tiếp DB đang được migrate. Không sửa DB bằng bridge.

## Quy trình review

1. Xem nguồn và MTM; chọn mức phù hợp, ghi URL/phép đo/điều kiện.
2. Đánh dấu thiếu bằng chứng khi không xác định được đúng hàng; không dùng số của mẫu khác.
3. Export JSON, mở trong website ở chế độ Chuyên sâu. Nội dung chỉ xem cục bộ, không lưu lên server.
4. Codex đọc annotation qua MCP và phân tích. Chỉ cập nhật public data khi bằng chứng mới được đối chiếu, không tự chuyển nhãn review thành thông số hãng.

Nguồn: https://labelstud.io/guide/tasks.html · https://labelstud.io/guide/export.html · https://api.labelstud.io/api-reference/api-reference/projects/create · https://api.labelstud.io/api-reference/api-reference/projects/import-tasks

Nhúng toàn bộ ứng dụng bằng tag ReactCode chỉ có ở Enterprise theo https://labelstud.io/tags/reactcode. Bộ task/XML hiện tại dùng Text/Choices/TextArea, không giả vờ có Enterprise hoặc tài khoản cloud.

## Làm mới project cục bộ hiện có

Không import lại36task vào project1. Để cập nhật dữ liệu và nguồn mà giữ ID, annotation, draft và prediction:

```powershell
node scripts/export-tasks.mjs
python integrations/label-studio/refresh_local.py
python integrations/label-studio/refresh_local.py --apply
```

Lệnh đầu kiểm tra sai khác; `--apply` sao lưu SQLite vào `.private/backups/`, cập nhật đúng36task theo claim_id trong transaction và kiểm tra phần đánh giá còn nguyên. Chỉ hỗ trợ schema cục bộ đã thiết lập; không dùng cho instance từ xa hoặc DB đang migration. Script riêng này có quyền ghi theo lệnh người dùng; MCP vẫn chỉ đọc. Báo cáo đồng bộ lưu ở `.private/labelstudio-refresh-report.json`. Nguồn task chứa toàn bộ URL đối chiếu, data_version và số công bố có đơn vị cho giá/cân nặng/RAM/SSD/pin. Giao diện review hiện có hiển thị các URL ở trườngsource; pin50Wh được nhắc trongreview_prompt và không biến thành số giờ sử dụng.
