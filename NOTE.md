## daohuyenmy : lần đầu, tải dữ liệu từng video xem, tải từ server, lưu dữ liệu vào cache. Lần sau truy cập sẽ sử dụng cache mà k tải từ server nữa. Không tăng MB resources quá nhiều

## tiktok-test : lần đầu sẽ tải 1 loạt all dữ liệu và thêm vào cache. Lần sau sử dụng cache để xem video ( có thể tải mảnh phân rã status 206 nên tiêu tốn 1 chút MB transferred ), và có tăng MB resources nhiều khi dùng lâu

## Trong folder này chứa folder tiktok-test : là phiên bản logic khác. Lần đầu truy cập sẽ tải 1 loạt all dữ liệu video, từ lần sau sẽ dùng cache mà k tải từ server nữa. Tuy nhiên khi lướt xem sẽ ngày càng tăng bộ nhớ MB resources

## giải thích:
            // - BASE_URL_VIDEO: Đường dẫn gốc đến thư mục chứa video.
            // - VIDEOS_JSON_URL: Đường dẫn đến file JSON chứa thông tin video.
            // - REPOSITORY_PROJECT_ROOT: Đường dẫn gốc của dự án, dùng để đăng ký Service Worker.
            // - Nếu đang chạy trên GitHub Pages, sử dụng đường dẫn từ kho lưu trữ.
            // - Nếu đang chạy trên localhost, sử dụng đường dẫn cục bộ.
            // - Nếu đang chạy trên một tên miền khác, sử dụng đường dẫn tương ứng.
            // - Đảm bảo các đường dẫn này được cấu hình đúng để tải video và JSON từ đúng nguồn.