// Mô tả chức năng:
// - Component BasicTable là một bảng hiển thị thông tin của nhân viên.
// - Component này sử dụng các thành phần từ thư viện MUI (Material-UI) để xây dựng giao diện.
// - Các thông tin hiển thị trong bảng bao gồm: STT, Mã nhân viên, Tên nhân viên, Giới tính, Ngày sinh, Email, Số điện thoại, Chức vụ, Trạng thái, và các nút hoạt động (chi tiết, cập nhật, xóa/hoàn tác).
// - Component sẽ gọi API để lấy danh sách nhân viên và danh sách chức vụ từ server.
// - Component cũng hỗ trợ các chức năng như tìm kiếm, sắp xếp, phân trang, và thay đổi số lượng bản ghi trên mỗi trang.
// - Khi người dùng thực hiện tìm kiếm, sắp xếp, hoặc thay đổi số lượng bản ghi trên mỗi trang, component sẽ gọi API để lấy danh sách nhân viên mới dựa trên các tham số tương ứng.
// - Khi người dùng nhấn nút chi tiết, cập nhật, xóa/hoàn tác, component sẽ gọi API tương ứng để thực hiện các hành động tương ứng với nút đó.
// - Component cũng hỗ trợ reset dữ liệu về trạng thái ban đầu.
// - Component sử dụng các icon từ thư viện IconService để hiển thị biểu tượng cho các nút hoạt động.
// - Component sử dụng thư viện dayjs để định dạng ngày tháng.
// - Component sử dụng thư viện lodash để sắp xếp danh sách nhân viên dựa trên cấu hình sắp xếp.
// - Component sử dụng hook useState để lưu trữ và cập nhật các giá trị state.
// - Component sử dụng hook useEffect để gọi API và cập nhật dữ liệu khi có sự thay đổi trong các giá trị state.
// - Component sử dụng hook useSearchParams để lấy và cập nhật các tham số tìm kiếm từ URL.
// - Component sử dụng hook useNavigate để chuyển hướng đến các trang khác trong ứng dụng.
// - Component sử dụng các thành phần từ thư viện MUI như Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper, Button, Tooltip, Chip, InputAdornment, OutlinedInput, Box, Grid, Pagination, Avatar, MenuItem, Select, InputLabel, FormControl để xây dựng giao diện.
// - Component sử dụng các hàm từ thư viện ChucVuService và HttpUtils để gọi API.
// - Component sử dụng các biểu tượng từ thư viện IconService để hiển thị biểu tượng cho các nút hoạt động.