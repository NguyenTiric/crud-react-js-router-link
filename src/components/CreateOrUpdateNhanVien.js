// Import các thư viện và component cần thiết
import {useFormik} from "formik";
import * as Yup from "yup";
import {create, getOne, updateById} from "../service/HttpUtils";
import {
	Button,
	FormControl,
	FormControlLabel,
	FormLabel,
	InputLabel, MenuItem,
	Radio,
	RadioGroup, Select,
	TextField
} from "@mui/material";
import * as React from "react";
import {useEffect, useState} from "react";
import ChucVuService from "../service/ChucVuService";
import {useNavigate, useParams} from "react-router-dom";

// Component CreateOrUpdateNhanVien
const CreateOrUpdateNhanVien = () => {
	// Khởi tạo state và các biến cần thiết
	const [listChucVu, setListChucVu] = useState([]);
	const {id} = useParams();
	const navigate  = useNavigate();

	// Hàm fetchDataChucVu để lấy danh sách chức vụ từ API
	const fetchDataChucVu = async () => {
		const response = await ChucVuService.getAllChuVu();
		setListChucVu(response.data);
	};

	// Sử dụng hook useEffect để gọi hàm fetchDataChucVu khi component được render
	useEffect(() => {
		const fetchDataAndResetData = async () => {
			await fetchDataChucVu();
			if(id){
				let response = await getOne(id, "nhan-vien");
				formik.setValues(response)
			}
		};
		fetchDataAndResetData();
	}, []);

	// Sử dụng hook useFormik để quản lý form và các trạng thái của form
	const formik = useFormik({
		initialValues: {
			ma: "", ten: "", ngaySinh: "", gioiTinh: "", email: "", sdt: "",
			chucVu: null
		},
		validationSchema: Yup.object({
			ma: Yup.string().min(1,"Mã phải lớn hơn 1 kí tự")
				.max(225,"Mã không dài quá 225 kí tự")
				.required("Mã không được để trống"),
			ten: Yup.string().min(1,"Tên phải lớn hơn 1 kí tự")
				.max(225,"Tên không dài quá 225 kí tự")
				.required("Tên không được để trống"),
			sdt: Yup.string()
				.required("Số điện thoại không được để trống"),
			email: Yup.string().email("Email sai định dạng")
				.required("Email không được để trống"),
			gioiTinh: Yup.string()
				.required("Giới tính không được để trống"),
			chucVu: Yup.object()
				.required("Chức vụ không được để trống"),
		}),
		onSubmit: values =>{
			handleCreateOrUpdateNhanNien();
		}
	})

	// Hàm handleCreateOrUpdateNhanNien để tạo hoặc cập nhật thông tin nhân viên
	const handleCreateOrUpdateNhanNien = async () => {
		try {
			let status;
			if (formik.values.id) {
				status = await updateById(formik.values.id, "nhan-vien", formik.values);
			} else {
				status = await create("nhan-vien", formik.values);
			}
			formik.resetForm();
			navigate('/');
		} catch (error) {
			console.error(error);
		}
	};

	const handleChangeChucVu = (e) => {
		const chucVuId = e.target.value;
		const chucVuDuocChon = listChucVu.find((chucVu) => chucVu.id === chucVuId);
		formik.setValues((prevState) => ({
			...prevState,
			chucVu: chucVuDuocChon || "",
		}));
	};

	// Render giao diện form
	return(
		<div>
			<form onSubmit={formik.handleSubmit}>
				<TextField
					label="Mã"
					variant="standard"
					fullWidth
					style={{marginTop: "16px", marginBottom: "16px"}}
					value={formik.values.ma}
					onChange={formik.handleChange}
					name="ma"
				/>
				{formik.errors.ma && formik.touched.ma && (
					<p>{formik.errors.ma}</p>
				)}

				<TextField
					label="Tên"
					variant="standard"
					fullWidth
					style={{marginBottom: "16px"}}
					value={formik.values.ten}
					onChange={formik.handleChange}
					name="ten"
				/>
				{formik.errors.ten && formik.touched.ten && (
					<p>{formik.errors.ten}</p>
				)}

				<FormLabel id="demo-controlled-radio-buttons-group">Giới tính</FormLabel>
				<RadioGroup
					row
					aria-labelledby="demo-row-radio-buttons-group-label"
					style={{marginBottom: "16px"}}
					value={formik.values.gioiTinh}
					onChange={formik.handleChange}
					name="gioiTinh"
				>
					<FormControlLabel value="false" control={<Radio/>} label="Nữ"/>
					<FormControlLabel value="true" control={<Radio/>} label="Nam"/>
				</RadioGroup>
				{formik.errors.gioiTinh && formik.touched.gioiTinh && (
					<p>{formik.errors.gioiTinh}</p>
				)}

				<TextField
					label="Email"
					variant="standard"
					fullWidth
					style={{marginBottom: "16px"}}
					value={formik.values.email}
					onChange={formik.handleChange}
					name="email"
				/>
				{formik.errors.email && formik.touched.email && (
					<p>{formik.errors.email}</p>
				)}

				<TextField
					label="Số điện thoại"
					variant="standard"
					fullWidth
					style={{marginBottom: "16px", marginTop: "16px"}}
					value={formik.values.sdt}
					onChange={formik.handleChange}
					name="sdt"
				/>
				{formik.errors.sdt && formik.touched.sdt && (
					<p>{formik.errors.sdt}</p>
				)}

				<TextField
					label="Ngày Sinh"
					type="date"
					variant="standard"
					fullWidth
					style={{marginBottom: "16px"}}
					value={formik.values.ngaySinh}
					onChange={formik.handleChange}
					name="ngaySinh"
				/>
				{formik.errors.ngaySinh && formik.touched.ngaySinh && (
					<p>{formik.errors.ngaySinh}</p>
				)}

				<FormControl sx={{ m: 1, minWidth: 120 }}>
					<InputLabel id="demo-simple-select-autowidth-label">Chức vụ</InputLabel>
					<Select
						labelId="demo-simple-select-autowidth-label"
						id="demo-simple-select-autowidth"
						value={formik.values.chucVu?.id || ""}
						onChange={handleChangeChucVu}
						name="chucVu"
						fullWidth
					>
						<MenuItem value="">Chọn chức vụ</MenuItem>
						{listChucVu.map((row) => (
							<MenuItem key={row.id} value={row.id}>
								{row.ten}
							</MenuItem>
						))}
					</Select>
				</FormControl>
				{formik.errors.chucVu && formik.touched.chucVu && (
					<p>{formik.errors.chucVu}</p>
				)}

				<Button type="submit" color="primary">
					{formik.values?.id ? "Cập nhật Nhân Viên" : "Thêm Nhân Viên"}
				</Button>
			</form>
		</div>
	)
}

export default CreateOrUpdateNhanVien