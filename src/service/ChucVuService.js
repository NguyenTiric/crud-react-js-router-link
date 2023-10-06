import axios from "axios";

const CHUCVU_BASE_URL = "http://localhost:8080/api/chuc-vu";


const ChuVuService = {
	getAllChuVu: () => {
		return axios.get(CHUCVU_BASE_URL);
	}
};
export default ChuVuService;

// const formik = useFormik({
// 	initialValues: {
// 		ma: '',
// 		ten: '',
// 		gioiTinh: '',
// 		ngaySinh: null,
// 		email: '',
// 		sdt: '',
// 		chucVu: null,
// 	},
// 	validationSchema: Yup.object({
// 		ten: Yup.string().required("Tên không để trống"),
// 		email: Yup.string().required("Email không để trống"),
// 		sdt: Yup.string().required("Số điện thoại không để trống"),
// 		gioiTinh: Yup.string().required("Giới tính không để trống"),
// 		chucVu: Yup.string().required("Chức vụ không để trống"),
// 		ngaySinh: Yup.string()
// 			.required("Ngày sinh không được để trống")
// 			.test("age", "Phải trên 18 tuổi", (value) => {
// 				if (!value) return false; // Trường rỗng không thỏa điều kiện
// 				const birthDate = new Date(value);
// 				const today = new Date();
// 				const age = today.getFullYear() - birthDate.getFullYear();
// 				// Kiểm tra xem tuổi có lớn hơn 18 không
// 				if (age > 18) {
// 					return true;
// 				}
// 				return false;
// 			}),
// 	}),
// 	onSubmit: (values) => {
// 		console.log(values);
// 	},
// });

// <Dialog fullWidth maxWidth="xl" open={open} onClose={handleClose}>
// 	<DialogTitle>Detail Nhan Vien</DialogTitle>
// 	<DialogContent>
// 		<TextField
// 			label="Mã"
// 			variant="standard"
// 			fullWidth
// 			style={{ marginTop: "16px", marginBottom: "16px" }}
// 			value={formik.values.ma}
// 			onChange={formik.handleChange}
// 			className={formik.errors.ma && formik.touched.ma ? 'error-input' : ''}
// 		/>
// 		{formik.errors.ma && formik.touched.ma && <p>{formik.errors.ma}</p>}
// 		<TextField
// 			label="Tên"
// 			variant="standard"
// 			fullWidth
// 			style={{ marginBottom: "16px" }}
// 			value={formik.values.ten}
// 			onChange={formik.handleChange}
// 			className={formik.errors.ten && formik.touched.ten ? 'error-input' : ''}
// 		/>
// 		{formik.errors.ten && formik.touched.ten && <p>{formik.errors.ten}</p>}
// 		<RadioGroup
// 			row
// 			aria-labelledby="demo-row-radio-buttons-group-label"
// 			name="gioiTinh"
// 			style={{ marginBottom: "16px" }}
// 			value={formik.values.gioiTinh}
// 			onChange={formik.handleChange}
// 		>
// 			<FormControlLabel value="female" control={<Radio />} label="Nữ" />
// 			<FormControlLabel value="male" control={<Radio />} label="Nam" />
// 		</RadioGroup>
// 		{formik.errors.gioiTinh && formik.touched.gioiTinh && <p>{formik.errors.gioiTinh}</p>}
// 		<TextField
// 			label="Email"
// 			variant="standard"
// 			fullWidth
// 			style={{ marginBottom: "16px", marginTop: "16px" }}
// 			value={formik.values.email}
// 			onChange={formik.handleChange}
// 			className={formik.errors.email && formik.touched.email ? 'error-input' : ''}
// 		/>
// 		{formik.errors.email && formik.touched.email && <p>{formik.errors.email}</p>}
// 		<TextField
// 			label="Số điện thoại"
// 			variant="standard"
// 			fullWidth
// 			style={{ marginBottom: "16px", marginTop: "16px" }}
// 			value={formik.values.sdt}
// 			onChange={formik.handleChange}
// 			className={formik.errors.sdt && formik.touched.sdt ? 'error-input' : ''}
// 		/>
// 		{formik.errors.sdt && formik.touched.sdt && <p>{formik.errors.sdt}</p>}
// 		<FormControl fullWidth style={{ marginBottom: "16px", marginTop: "16px" }}>
// 			<InputLabel id="demo-simple-select-label">Chức vụ</InputLabel>
// 			<Select
// 				labelId="demo-simple-select-label"
// 				id="demo-simple-select"
// 				value={formik.values.chucVu}
// 				label="Chức vụ"
// 				onChange={formik.handleChange}
// 				name="chucVu"
// 			>
// 				{listChucVu.map((row) => (
// 					<MenuItem key={row.id} value={row}>
// 						{row.ten}
// 					</MenuItem>
// 				))}
// 			</Select>
// 		</FormControl>
// 		{/*<LocalizationProvider dateAdapter={AdapterDayjs}>*/}
// 		{/*	<DatePicker*/}
// 		{/*		label="Ngày Sinh"*/}
// 		{/*		sx={{ width: '100%' }}*/}
// 		{/*		value={formik.values.ngaySinh}*/}
// 		{/*		className={formik.errors.ngaySinh && formik.touched.ngaySinh ? 'error-input' : ''}*/}
// 		{/*		onChange={(date) => formik.setFieldValue("ngaySinh", date)} // Cập nhật giá trị 'ngaySinh' trong formik*/}
// 		{/*	/>*/}
// 		{/*	{formik.errors.ngaySinh && formik.touched.ngaySinh && <p>{formik.errors.ngaySinh}</p>}*/}
// 		{/*</LocalizationProvider>*/}
// 	</DialogContent>
// 	<DialogActions>
// 		<Button onClick={handleUpdateNhanVien} color="primary">
// 			Cập nhật
// 		</Button>
// 		<Button onClick={handleClose}>Close</Button>
// 	</DialogActions>
// </Dialog>