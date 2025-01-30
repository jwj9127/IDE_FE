import axios from "axios";

console.log("환경 변수 REACT_APP_BASE_URL:", process.env.REACT_APP_BASE_URL);

// HTTPS formatting 추가
const formattedURL = `https://${process.env.REACT_APP_BASE_URL}`

// Axios 인스턴스 생성
const axiosInstance = axios.create({
    baseURL: formattedURL, 
    headers: {
        "Content-Type": "application/json",
    },
});

// 요청 인터셉터 설정: 모든 요청에 Authorization header 추가
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token"); // local storage에서 token 가져오기
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        } else {
            console.warn("토큰이 없습니다. 로그인 상태를 확인하세요.");
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;
