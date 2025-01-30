import axios from "axios";

// Axios 인스턴스 생성
const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL, // 환경변수에서 API 기본 URL 설정
    headers: {
        "Content-Type": "application/json",
    },
});

// 요청 인터셉터 설정 (모든 요청에 Authorization 헤더 추가)
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("jwt"); // 로컬 스토리지에서 토큰 가져오기
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;