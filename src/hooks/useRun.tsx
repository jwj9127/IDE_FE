import axiosInstance from "../utils/axiosInstance";
import axios from "axios";

interface RunData {
    code: string;
    problemId: number;
    language: string;
}

interface RunResult {
    message: string; // 서버에서 반환된 메시지
    resultMessage: string; // 서버에서 반환된 결과 메시지
    extractedResults: string; // 추출된 결과
}

export const useRun = () => {
    const runCode = async (data: RunData): Promise<RunResult> => {
        try {
            const API_URL = `/api/code/submit`;

            console.log("📡 API 요청 URL:", API_URL);
            console.log("📡 요청 데이터:", {
                code: data.code,
                problemId: data.problemId,
                language: data.language,
            });

            const response = await axiosInstance.post(API_URL, {
                code: data.code,
                problemId: data.problemId,
                language: data.language,
            });

            const resultMessage: string =
                response.data.resultMessage || "결과 메시지가 없습니다.";
            const message: string =
                response.data.message || "메시지가 없습니다.";
            const extractedResults = extractResults(resultMessage);

            return {
                message,
                resultMessage,
                extractedResults:
                    extractedResults || "결과를 처리할 수 없습니다.",
            };
        } catch (error: any) {
            console.error("❌ 코드 실행 실패:", error);

            if (axios.isAxiosError(error)) {
                console.error(
                    "❌ AxiosError 응답 데이터:",
                    error.response?.data
                );
                return {
                    message: "결과를 처리할 수 없습니다.",
                    resultMessage: "코드 실행 중 오류가 발생했습니다.",
                    extractedResults: "코드 실행 중 오류가 발생했습니다.",
                };
            } else {
                console.error("❌ 알 수 없는 오류:", error);
                return {
                    message: "결과를 처리할 수 없습니다.",
                    resultMessage: "코드 실행 중 오류가 발생했습니다.",
                    extractedResults: "코드 실행 중 오류가 발생했습니다.",
                };
            }
        }
    };

    const extractResults = (message: string): string => {
        const regex = /Result:\s*(.*?)\s*Input:/g;
        let match;
        const results: string[] = [];

        while ((match = regex.exec(message)) !== null) {
            results.push(match[1].trim());
        }

        return results.join("\n");
    };

    return { runCode };
};
