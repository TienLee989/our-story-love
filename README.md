# Tiến & Trang — Our Love Story
Website HTML/CSS/JavaScript thuần, không cần build hoặc backend.

## GitHub Pages
1. Tạo repository GitHub (lưu ý ảnh cá nhân sẽ công khai nếu dùng Pages công khai).
2. Giải nén ZIP, upload toàn bộ nội dung bên trong lên nhánh `main` (index.html ở root).
3. Settings → Pages → Build and deployment → Deploy from a branch → main / (root) → Save.
4. Mở URL GitHub Pages được cung cấp.

## Chạy local
Mở index.html hoặc chạy `python -m http.server 8000` rồi mở http://localhost:8000.

## Tính năng
- Đếm thời gian từ 01/10/2026 theo giờ Việt Nam; tháng lịch, tuần/ngày/giờ trọn vẹn.
- Sinh nhật Dương Thùy Trang 22/07/2006, Lê Văn Tiến 10/09/1998; đếm ngược hằng năm.
- Album: tạo, đổi tên, xóa, thêm ảnh, xem ảnh, xóa ảnh; 7 ảnh gốc có sẵn.
- Timeline: thêm/sửa/xóa kỷ niệm, ảnh minh họa tùy chọn.
- Lời nhắn: viết, xem, xóa; chế độ sáng/tối; responsive; giảm chuyển động theo tùy chọn hệ điều hành.

## Lưu trữ và quyền riêng tư
Dữ liệu thêm/sửa/xóa lưu bằng localStorage trên từng trình duyệt, không đồng bộ giữa hai người. Xóa dữ liệu trình duyệt sẽ mất thay đổi. Ảnh tải lên được thu nhỏ để tiết kiệm dung lượng; localStorage có giới hạn. Muốn cập nhật chung, sửa defaults trong app.js và thêm ảnh vào assets, commit lên GitHub. Website không có xác thực; không đăng ảnh hoặc thông tin riêng tư lên Pages công khai nếu không muốn người khác xem. Font Google có thể dùng mạng; có font dự phòng.

## Cấu trúc
- index.html: giao diện
- style.css: theme, responsive, animation
- app.js: dữ liệu và tương tác
- assets/: ảnh gốc

## Media v1.1
Original piano MP3 and 28-second photo montage MP4 are bundled locally. Click the floating music button to start audio; browser autoplay is not assumed. Video pauses background audio. Custom media selected through file inputs is temporary, not uploaded or persisted. To permanently replace media, replace the corresponding files in assets and commit to GitHub.

## v1.2 — Gentle Motion
- Nút ⚙ trên thanh điều hướng mở cài đặt chuyển động; mặc định 14 cánh hoa/trái tim (8 trên mobile) mỗi 120 giây, mỗi đợt khoảng 5–9 giây.
- Có thể tắt toàn bộ chuyển động, tắt riêng hiệu ứng rơi, đổi kiểu, đổi chu kỳ 1/2/5/10 phút và xem thử ngay.
- Cài đặt lưu riêng trong `our-story-effects-v1`; dữ liệu album, kỷ niệm và lời nhắn giữ nguyên key cũ. Hiệu ứng dừng khi tab ẩn, tôn trọng prefers-reduced-motion.
- `app.js`, `media.js` và toàn bộ assets giữ nguyên từ v1.1. Không cần thêm thư viện.

## v1.3
- Hiệu ứng bắt đầu ngay khi vào trang: 3 phút hoạt động (các đợt nhẹ cách nhau 10 giây), nghỉ 2 phút mặc định, sau đó lặp. Tab ẩn dừng hiệu ứng; quay lại bắt đầu chu kỳ mới. Có thể tắt hoặc chọn thời gian nghỉ trong Settings. Tôn trọng Reduced Motion.
- Adaptive glass UI lấy cảm hứng từ iOS/macOS, responsive, safe-area, giao diện sáng/tối/theo hệ thống.
- VI / EN / 日本語: dịch giao diện, thông báo, biểu mẫu và bộ đếm; tên riêng, nội dung tự nhập và media giữ nguyên. Cài đặt ngôn ngữ lưu local.
- Giữ nguyên storage keys và assets từ v1.2. Không có backend, không đồng bộ giữa thiết bị.
- Kiểm tra cú pháp JS và ZIP; môi trường chặn Chromium truy cập localhost/file nên chưa xác nhận trực quan trên trình duyệt.

## v1.4
- Thử phát nhạc ngay khi mở trang (45% âm lượng). Nếu trình duyệt chặn autoplay có tiếng, chạm nút nhạc hoặc vùng nội dung để phát. Video vẫn tạm dừng nhạc nền.
- Album tự chuyển ảnh riêng mỗi 4,5 giây với crossfade 1,1 giây. Slideshow trong album có nút tạm dừng. Tôn trọng cài đặt tắt chuyển động và reduced motion.
- Mục Những điều nhỏ bé: chỉnh sửa điều trân trọng và lời hứa; thêm, đánh dấu hoàn thành và xóa mong muốn. Dữ liệu mới lưu riêng trong `our-story-little-v1`, không thay đổi khóa dữ liệu cũ. Nội dung tự nhập không tự dịch; nội dung mẫu hỗ trợ VI/EN/JA.
- Kiểm tra cú pháp JS và tính toàn vẹn ZIP; chưa chạy kiểm thử giao diện Safari/Chromium.

## v1.5 — Glass dashboard & playlist
- New responsive dashboard inspired by the approved design; original separate portraits, custom SVG scenery and icons (not pixel-identical to mockup).
- Persistent uploaded audio in IndexedDB, max 50 MB per file; playlist, seek, volume, shuffle, previous/next and repeat. Files stay on the device; they are not uploaded to GitHub. Original track remains included.
- Autoplay requested immediately; if browser denies audible autoplay, the next eligible interaction retries. Browser policy cannot be bypassed. Video pauses music and resumes it when appropriate.
- Existing LocalStorage keys, album crossfade, effects cycle, language preferences and original media retained. Future wishes progress widget and shortcut cards added.
- Validation: JavaScript syntax and unique HTML IDs checked; actual Safari/Chrome rendering and autoplay not verified.

## v1.7 — Immersive memories
- `immersive.js` and `immersive.css`: IntersectionObserver starts reveal animations when sections enter the viewport; album images and the default video source are assigned lazily. Hero photos and audio remain eager for the initial experience.
- Desktop pointer-driven perspective tilt (max 6°); mobile scroll-entry depth animation; existing motion setting and reduced-motion preference disable animations.
- Album cards show collection totals, independent crossfades and responsive two-column mobile layout. Timeline groups chronological milestones by year, numbers cards, uses horizontal scroll snapping on desktop and vertical cards on phones. No invented milestones.
- Existing localStorage/IndexedDB keys, media assets and player logic are preserved. Replace repository files with this package to upgrade. Uploaded data remains local to the browser.
- Autoplay with sound still depends on browser permission.
"# our-story-love" 
