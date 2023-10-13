// Component hiển thị bảng thông tin nhân viên
import React, { useEffect, useState } from 'react';
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	Button,
	Tooltip,
	Chip,
	InputAdornment,
	OutlinedInput,
	Box,
	Grid,
	Pagination,
	Avatar,
	MenuItem,
	Select, InputLabel, FormControl,
} from '@mui/material';
import ChucVuService from '../service/ChucVuService';
import dayjs from 'dayjs';
import {BorderColorIcon, DeleteIcon, RepartitionIcon, VisibilityIcon} from '../icon/IconService';
import {getAll, revertOrRemove, search} from '../service/HttpUtils';
import { SearchIcon } from 'primereact/icons/search';
import {useNavigate, useSearchParams} from 'react-router-dom';
import _ from "lodash";

// Component hiển thị bảng thông tin nhân viên
const BasicTable = () => {
	const [listNhanVien, setListNhanVien] = useState([]); // Danh sách nhân viên
	const [listChucVu, setListChucVu] = useState([]); // Danh sách chức vụ
	const [sortConfig, setSortConfig] = useState({ key: null, direction: null }); // Cấu hình sắp xếp
	const [currentPage, setCurrentPage] = useState(0); // Trang hiện tại
	const [pageSize, setPageSize] = useState(5); // Số lượng bản ghi trên mỗi trang
	const [totalPages, setTotalPages] = useState(0); // Tổng số trang
	const pageSizeOptions = [5, 10, 20]; // Tùy chọn số lượng bản ghi trên mỗi trang
	const [resetData, setResetData] = useState(false); // Cờ để reset dữ liệu
	const [searchParams, setSearchParams] = useSearchParams(); // Tham số tìm kiếm
	const searchValue = searchParams.get('name') || ''; // Giá trị tìm kiếm
	const searchTrangThai = searchParams.get('trangThai') || ''; // Giá trị tìm kiếm
	const pageNo = searchParams.get('pageNo') || '0'; // Trang hiện tại
	const navigate = useNavigate();

	// Hàm lấy danh sách nhân viên từ API
	const createSearchParams = (filters) => {
		const searchParams = {};
		if (filters.searchValue !== "") {
			searchParams.search = filters.searchValue;
		}
		if (filters.searchTrangThai !== "") {
			searchParams.trangThai = filters.searchTrangThai;
		}
		return searchParams;
	};

	const fetchDataNhanVien = async () => {
		try {
			const filters = {
				searchValue,
				searchTrangThai,
				// Thêm các điều kiện fillter khác tại đây nếu cần
			};
			const searchParams = createSearchParams(filters);
			let response;
			if (Object.keys(searchParams).length > 0) {
				response = await search(searchParams.search, searchParams.trangThai, currentPage, pageSize, "nhan-vien");
			} else {
				// Xử lý khi không có điều kiện fillter nào được áp dụng
				response = await getAll(currentPage, pageSize, "nhan-vien");
			}
			setListNhanVien(response.content);
			setTotalPages(response.totalPages);
			console.log(listNhanVien);
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	};

	// Hàm lấy danh sách chức vụ từ API
	const fetchDataChucVu = async () => {
		const response = await ChucVuService.getAllChuVu();
		setListChucVu(response.data);
	};

	useEffect(() => {
		// Gọi hàm lấy danh sách nhân viên và danh sách chức vụ
		const fetchDataAndResetData = async () => {
			await fetchDataNhanVien();
			await fetchDataChucVu();
			if (resetData) {
				setResetData(false);
			}
		};
		fetchDataAndResetData();
	}, [currentPage, pageSize, resetData, searchValue,searchTrangThai]);

	useEffect(() => {
		// Cập nhật số lượng bản ghi trên mỗi trang và trang hiện tại khi thay đổi tham số tìm kiếm
		if (searchParams.size > 0) {
			setPageSize(searchParams.get("pageSize"))
			setCurrentPage(+searchParams.get("pageNo"))
		}
	}, [searchParams])

	// Hàm xử lý sự kiện thay đổi tìm kiếm
	const handleSearchNameChange = (event) => {
		const name = event.target.value; // Giá trị tìm kiếm tên
		const params = {
			name,
			trangThai: searchTrangThai,
			pageNo:0,
			pageSize
		};
		if (!searchTrangThai.trim()) {
			delete params.trangThai;
		}
		setSearchParams(params);
	};

	const handleSearchTrangThaiChange = (event) => {
		const trangThai = event.target.value; // Giá trị tìm kiếm trạng thái
		const params = {
			name:searchValue,
			trangThai,
			pageNo:0,
			pageSize
		};
		if (!searchValue.trim()) {
			delete params.name;
		}
		setSearchParams(params);
	};

	// Xử lý xóa Nhân viên
	const handleRemove = async (post) => {
		try {
			await revertOrRemove(post.id, "nhan-vien", "remove");
			await fetchDataNhanVien();
		} catch (error) {
			console.error("Error reverting NhanVien:", error);
		}
	};

	// Xử lý khôi phục Nhân viên
	const handleRevert = async (post) => {
		try {
			await revertOrRemove(post.id, "nhan-vien", "revert");
			await fetchDataNhanVien();
		} catch (error) {
			console.error("Error reverting NhanVien:", error);
		}
	};

	// Hàm xử lý sự kiện reset dữ liệu
	const handleReset = () => {
		const initialSortConfig = { key: null, direction: null };
		setSortConfig(initialSortConfig);
		setCurrentPage(0);
		setResetData(true);
		setSearchParams({});
	};

	// Hàm xử lý sự kiện thay đổi số lượng bản ghi trên mỗi trang
	const handlePageSizeChange = (event) => {
		const newPageSize = parseInt(event.target.value, 10);
		setPageSize(newPageSize);
		const newPage = Math.floor((currentPage * pageSize) / newPageSize);
		setCurrentPage(newPage);
		const params = {
			name: searchValue,
			trangThai: searchTrangThai,
			pageNo: newPage.toString(),
			pageSize: newPageSize.toString(),
		};
		if (!searchValue.trim()) {
			delete params.name;
		}
		if (!searchTrangThai.trim()) {
			delete params.trangThai;
		}
		setSearchParams(params);
	};

	// Hàm xử lý sự kiện thay đổi trang hiện tại
	const handlePageChange = (event, page) => {
		const params = {
			name: searchValue,
			trangThai: searchTrangThai,
			pageNo: (page - 1).toString(),
			pageSize: pageSize.toString(),
		};
		if (!searchValue.trim()) {
			delete params.name;
		}
		if (!searchTrangThai.trim()) {
			delete params.trangThai;
		}
		setSearchParams(params);
	};

	const handleSort = (property) => {
		let direction = "asc";
		if (sortConfig && sortConfig.key === property) {
			direction = sortConfig.direction === "asc" ? "desc" : "asc";
		}
		setSortConfig({key: property, direction});
		const sortedList = _.orderBy(listNhanVien, [property], [direction]);
		setListNhanVien(sortedList);
	};

	// Xử lý thay đổi Chức vụ

	return (
		<div>
			{/* Ô tìm kiếm */}
			<OutlinedInput
				id="input-search-header"
				placeholder="Tìm kiếm"
				value={searchValue}
				onChange={handleSearchNameChange} // Xử lý sự kiện thay đổi tìm kiếm
				startAdornment={
					<InputAdornment position="start">
						<SearchIcon />
					</InputAdornment>
				}
				aria-describedby="search-helper-text"
				inputProps={{ 'aria-label': 'weight' }}
			/>
			<FormControl sx={{ m: 1, minWidth: 120 }} size="small">
				<InputLabel id="demo-select-small-label">Trạng thái</InputLabel>
				<Select
					labelId="demo-select-small-label"
					id="demo-select-small"
					value={searchTrangThai}
					label="Age"
					onChange={handleSearchTrangThaiChange} // Xử lý sự kiện thay đổi trạng thái
				>
					<MenuItem value="">
						<em>None</em>
					</MenuItem>
					<MenuItem value={"ACTIVE"}>Hoạt Động</MenuItem>
					<MenuItem value={"INACTIVE"}>Không Hoạt Động</MenuItem>
				</Select>
			</FormControl>
			{/* Nút reset */}
			<Button onClick={handleReset} variant="contained" color="secondary">
				Reset
			</Button>
			<Button onClick={() => navigate('create-nhan-vien')}  variant="contained" color="secondary">
				ADD
			</Button>
			{/* Bảng thông tin nhân viên */}
			<TableContainer component={Paper}>
				<Table sx={{minWidth: 650}} aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell>STT</TableCell>
							<TableCell>Mã</TableCell>
							<TableCell onClick={() => handleSort("ten")}>
								Tên
								{sortConfig.key === "ten" && (sortConfig.direction === "asc" ? " ↑" : " ↓")}
							</TableCell>
							<TableCell>Giới Tính</TableCell>
							<TableCell onClick={() => handleSort("ngaySinh")}>
								Ngày Sinh
								{sortConfig.key === "ngaySinh" && (sortConfig.direction === "asc" ? " ↑" : " ↓")}
							</TableCell>
							<TableCell onClick={() => handleSort("email")}>
								Email
								{sortConfig.key === "email" && (sortConfig.direction === "asc" ? " ↑" : " ↓")}
							</TableCell>
							<TableCell onClick={() => handleSort("sdt")}>
								Số Điện Thoại
								{sortConfig.key === "sdt" && (sortConfig.direction === "asc" ? " ↑" : " ↓")}
							</TableCell>
							<TableCell>Chức Vụ</TableCell>
							<TableCell onClick={() => handleSort("trangThai.ten")}>
								Trạng Thái
								{sortConfig.key === "trangThai.ten" && (sortConfig.direction === "asc" ? " ↑" : " ↓")}
							</TableCell>
							<TableCell align={"center"}>Hoạt Động</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{listNhanVien.map((row,index) => (
							<TableRow key={row.id}>
								<TableCell>{index+1}</TableCell>
								<TableCell>{row?.ma}</TableCell>
								<TableCell>
									<div style={{display: "flex", alignItems: "center"}}>
										<Avatar
											className="userProfile"
											style={{width: "50px", height: "50px"}}
											src={row?.anh}
										/>
										<p style={{marginLeft: "10px"}}>{row?.ten}</p>
									</div>
								</TableCell>
								<TableCell>{row?.gioiTinh ? "Nam" : "Nữ"}</TableCell>
								<TableCell>{dayjs(row?.ngaySinh).format('DD/MM/YYYY')}</TableCell>
								<TableCell>{row?.email}</TableCell>
								<TableCell>{row?.sdt}</TableCell>
								<TableCell>{row?.chucVu?.ten}</TableCell>
								<TableCell>
									<Chip
										label={row?.trangThai}
										color={row?.trangThai === "ACTIVE" ? "success" : "error"}
										size="small"
									/>
								</TableCell>
								<TableCell>
									<Tooltip title="Chi tiết" placement="bottom">
										<Button size="small">
											<VisibilityIcon/>
										</Button>
									</Tooltip>
									<Tooltip title="Cập nhật" placement="bottom">
										<Button size="small" onClick={() => navigate(  `update-nhan-vien/${row.id}`  )}>
											<BorderColorIcon />
										</Button>
									</Tooltip>
									{row?.trangThai === "ACTIVE" ? (
										<Tooltip title="Ngừng kích hoạt" placement="bottom">
											<Button size="small" onClick={() => handleRemove(row)}>
												<DeleteIcon color={"error"}/>
											</Button>
										</Tooltip>
									) : (
										<Tooltip title="Kích hoạt" placement="bottom">
											<Button size="small" onClick={() => handleRevert(row)}>
												<RepartitionIcon color={"success"}/>
											</Button>
										</Tooltip>
									)}
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
				<Grid container justifyContent="space-between" alignItems="center" style={{display: 'flex', flexDirection: 'row'}}>
					<Grid item>
						<Select
							id="pageSizeSelect"
							value={pageSize}
							onChange={handlePageSizeChange}
						>
							{pageSizeOptions.map((option) => (
								<MenuItem key={option} value={option}>
									{option}
								</MenuItem>
							))}
						</Select>
					</Grid>
					<Grid item>
						<Pagination
							count={totalPages}
							page={currentPage + 1}
							onChange={(event, page) => {
								setCurrentPage(page - 1);
							}}
							color="primary"
						/>
					</Grid>
				</Grid>
			</TableContainer>
		</div>
	);
};

export default BasicTable;

