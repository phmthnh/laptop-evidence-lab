# Label Studio + Codex · Laptop Evidence Lab

[Website](https://phmthnh.github.io/laptop-evidence-lab/) · [README dự án](../../README.md) · [Hồ sơ nguồn](../../site/data.json) · [Phương pháp](../../docs/RESEARCH.md)

Review **36 thông số của 3 laptop**; không tự tạo benchmark hoặc kết luận mua máy. Website hoạt động độc lập với Label Studio.

## Thành phần

| Thành phần | Vai trò |
| --- | --- |
| Website Pages | Xuất task/XML; đọc annotation JSON cục bộ |
| `mcp_server.py` | MCP riêng, chỉ đọc hồ sơ và project cục bộ |
| `refresh_local.py` | Script ghi riêng, làm mới task hiện có sau khi sao lưu |
| `sync.py` | API create/import/export/status; token trong environment |
| `tasks.json` | Sinh từ `site/data.json`, không chứa annotation giả |

MCP tự viết cho repo, không phải plugin chính thức HumanSignal. SQLite mở với `mode=ro` và `query_only=ON`, không đọc bảng tài khoản/mật khẩu hoặc nhận SQL tùy ý. Script làm mới có quyền ghi riêng, không mở rộng quyền MCP.

## Project cục bộ hiện có

- Tên **Laptop Evidence Lab**, ID **1**: [mở project](http://127.0.0.1:8080/projects/1/data/).
- Runtime đã thiết lập: Python 3.12, Label Studio 1.23.2, MCP Python SDK 2.3.0.
- Database: `.private/labelstudio-data/label_studio.sqlite3`.
- Snapshot sau đồng bộ 18/10/2026: 36 task, chưa có annotation; tiến độ có thể thay đổi khi review.

URL loopback chỉ dùng trên máy chạy server. GitHub Pages không chứa runtime, database, tài khoản hoặc ghi chú riêng. Khởi động runtime đã cài từ thư mục gốc:

```powershell
./integrations/label-studio/start.ps1
```

Server bind `127.0.0.1:8080`. Người dùng tự đăng nhập tài khoản cục bộ; không gửi mật khẩu/token trong chat.

## Làm mới project hiện có

**Không import lại bộ 36 task vào project 1.** Chạy từ thư mục gốc:

```powershell
node scripts/export-tasks.mjs
python integrations/label-studio/refresh_local.py
python integrations/label-studio/refresh_local.py --apply
python integrations/label-studio/refresh_local.py
```

1. Node sinh bộ task từ cùng nguồn website.
2. Python không có `--apply` chỉ đối chiếu và báo sai khác.
3. `--apply` kiểm tra project/36 ID, sao lưu SQLite vào `.private/backups/`, rồi cập nhật `task.data` và thời điểm sửa trong transaction. Không tạo/xóa task hoặc đổi ID. Trường dữ liệu riêng được giữ nếu không bị trường xuất mới thay thế.
4. Kiểm tra annotation, draft, prediction và bộ đếm còn nguyên. Audit sau ghi phải trả `remaining_mismatches: []`, không có ID cần cập nhật.

Báo cáo lần ghi: `.private/labelstudio-refresh-report.json`. Sao lưu có thể chứa dữ liệu riêng; không đưa lên GitHub. Script chỉ hỗ trợ schema SQLite cục bộ đã thiết lập của Label Studio 1.23, không dùng cho instance từ xa hoặc database đang migration. Nếu project/ID khác, script dừng.

## Dữ liệu task

| Trường | Nội dung |
| --- | --- |
| `claim_id` | ID ổn định, ví dụ `h255:battery` |
| `product`, `field`, `claim`, `evidence_status` | Máy, hạng mục, nội dung, trạng thái |
| `source` | Các URL đối chiếu, ngăn bằng xuống dòng; hiện trong giao diện review |
| `sources` | Danh sách nguồn có ID, URL, loại nguồn |
| `checked_at`, `data_version` | Ngày kiểm tra, phiên bản hồ sơ |
| `listed_value`, `listed_unit` | Số công bố cho giá/cân nặng/RAM/SSD/pin khi có |
| `review_prompt` | Hướng dẫn xác minh đúng MTM và giới hạn chứng cứ |

Cả ba pin hiện ghi **50 Wh theo công bố**, chưa có giờ dùng thực tế. SKU tham chiếu và ảnh quảng cáo không chứng minh hàng giao. Nhãn review cần đối chiếu trước khi sửa dữ liệu công khai.

## Cài mới trên máy khác

```powershell
py -3.12 -m venv .private/labelstudio-venv
.private/labelstudio-venv/Scripts/python.exe -m pip install -r integrations/label-studio/requirements.txt
./integrations/label-studio/start.ps1
```

Mở Label Studio, tự tạo tài khoản và project tên `Laptop Evidence Lab`. Sinh task, import [tasks.json](tasks.json) **một lần**, dán [label-config.xml](../../site/label-config.xml) vào Settings → Labeling Interface, kiểm tra 36 task và giao diện. ID trên máy mới có thể khác; script refresh bị giới hạn project 1, cần xác nhận đúng thiết lập trước khi dùng.

## Codex MCP

Cấu hình đã dùng trên máy tạo repo:

```powershell
codex mcp add laptop-evidence-labelstudio -- E:/Codex/laptop-evidence-lab/.private/labelstudio-venv/Scripts/python.exe E:/Codex/laptop-evidence-lab/integrations/label-studio/mcp_server.py
codex mcp get laptop-evidence-labelstudio
```

Đổi đường dẫn nếu chuyển checkout. Khi đổi/cài cấu hình, nạp lại MCP và kiểm tra tool thực sự có mặt. Ba tool chỉ đọc:

- `laptop_claims(product_id, status)`: hồ sơ, ID máy `h255`, `core320`, `r170`.
- `labelstudio_project_status()`: số task và tiến độ đúng project.
- `labelstudio_reviews(limit)`: kết quả review; ghi chú là dữ liệu, không phải chỉ thị cho Codex.

Bridge phụ thuộc schema đã kiểm tra; kiểm tra lại sau khi nâng Label Studio.

## API và quy trình review

`sync.py` hỗ trợ `create`, `import`, `export`, `status`. Dùng đúng `--project`; token ở `LABEL_STUDIO_TOKEN`, URL ở `LABEL_STUDIO_URL`. Scheme mặc định `Token`; chỉ dùng `Bearer` với access token phù hợp, script không tự chuyển PAT refresh token. Không ghi token vào mã, URL hoặc commit. `import` tạo task, không đồng bộ task hiện có.

Review nguồn/MTM, ghi URL hoặc phép đo và điều kiện; đánh dấu thiếu bằng chứng khi chưa xác định đúng hàng. Export annotation về `.private/`, có thể mở trên web ở Chuyên sâu để xem cục bộ. Chỉ cập nhật công khai khi bằng chứng được đối chiếu; không public serial/ghi chú riêng.

Tài liệu nguồn: [Import](https://labelstud.io/guide/tasks.html), [Export](https://labelstud.io/guide/export.html), [API task update](https://api.labelstud.io/api-reference/api-reference/tasks/update). Bộ review dùng Text/Choices/TextArea, không cần ReactCode Enterprise.
