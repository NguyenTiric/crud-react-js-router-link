import axios from 'axios';
import {deleteFile, saveFile} from "../firebase/firebase";

// Đường dẫn cơ sở của API
const BASE_URL = "http://localhost:8080/api";

// Hàm lấy danh sách tất cả các đối tượng từ API
export const getAll = async (pageNo, pageSize, name) => {
    try {
        const response = await axios.get(`${BASE_URL}/${name}`, {
            params: {
                pageNo,
                pageSize,
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Hàm tìm kiếm đối tượng từ API
export const search = async (searchValue, searchTrangThai, pageNo, pageSize, name) => {
    try {
        const response = await axios.get(`${BASE_URL}/${name}/search`, {
            params: {
                search: searchValue,
                trangThai: searchTrangThai,
                pageNo,
                pageSize,
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Hàm lấy thông tin của một đối tượng từ API dựa trên id
export const getOne = async (id, name) => {
    try {
        const response = await axios.get(`${BASE_URL}/${name}/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Hàm tạo mới một đối tượng từ API
export const create = async (name, entity) => {
    try {
        const response = await axios.post(`${BASE_URL}/${name}/create`, entity);
        return response.status;
    } catch (error) {
        throw error;
    }
};

// Hàm cập nhật thông tin của một đối tượng từ API dựa trên id
export const updateById = async (id, name, entity) => {
    try {
        const response = await axios.put(`${BASE_URL}/${name}/update/${id}`, entity);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const createImage = async (name, entity,imageUpload) => {
    try {
        const getImagePath = await saveFile(imageUpload);
        entity.anh =  getImagePath;
        const response = await axios.post(`${BASE_URL}/${name}/create`, entity);
        return response.status;
    } catch (error) {
        throw error;
    }
};

// Hàm cập nhật thông tin của một đối tượng từ API dựa trên id
export const updateImageById = async (id, name, entity,newImage) => {
    try {
        if(newImage !== ''){
            await deleteFile(entity.anh);
            const getImage = await saveFile(newImage);
            entity.anh = getImage;
        }
        const response = await axios.put(`${BASE_URL}/${name}/update/${id}`, entity);
        return response.data;
    } catch (error) {
        throw error;
    }
};


// Hàm hoàn tác hoặc xóa một đối tượng từ API dựa trên id
export const revertOrRemove = async (id, name, revertOrRemove) => {
    try {
        const response = await axios.put(`${BASE_URL}/${name}/${revertOrRemove}/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};