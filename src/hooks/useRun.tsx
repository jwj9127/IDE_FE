import axiosInstance from "../utils/axiosInstance";
import axios from "axios";

interface RunData {
    code: string;
    problemId: number;
    language: string;
}

export const useRun = () => {
    const runCode = async (data: RunData): Promise<string> => {
        try {
            const API_URL = `/api/code/submit`;

            console.log("📡 API 요청 URL:", API_URL);
            console.log("📡 요청 데이터:", {
                code: data.code,
                problemId: data.problemId,
                language: data.language,
            });

            // Axios 인스턴스 사용
            const response = await axiosInstance.post(API_URL, {
                code: data.code,
                problemId: data.problemId,
                language: data.language,
            });

            console.log("✅ 서버 응답:", response.data);

            return response.data.resultMessage || "결과 메시지가 없습니다.";
        } catch (error: any) {
            console.error("❌ 코드 실행 실패:", error);

            if (axios.isAxiosError(error)) {
                console.error(
                    "❌ AxiosError 응답 데이터:",
                    error.response?.data
                );
                return `코드 실행 중 오류가 발생했습니다: ${
                    error.response?.data?.message || error.message
                }`;
            } else {
                console.error("❌ 알 수 없는 오류:", error);
                return "알 수 없는 오류가 발생했습니다.";
            }
        }
    };

    return { runCode };
};
