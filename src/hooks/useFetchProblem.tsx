import { useState, useEffect } from "react";
import axios from "axios";
import axiosInstance from "../utils/axiosInstance";

interface ProblemData {
    problemId: number;
    content: string;
}

export const useFetchProblem = () => {
    const [problem, setProblem] = useState<ProblemData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProblem = async () => {
            try {
                setLoading(true);
                setError(null);

                // 오늘 날짜 계산
                const todayDate = new Date();
                const date =
                    todayDate.getFullYear().toString() +
                    "-" +
                    (todayDate.getMonth() + 1).toString().padStart(2, "0") +
                    "-" +
                    todayDate.getDate().toString().padStart(2, "0");

                const apiUrl = `/api/problem?date=${date}`;
                const response = await axiosInstance.get(apiUrl);

                console.log("📡 서버 응답:", response);

                // ✅ 수정: response.status 사용
                if (response.status === 200 && response.data) {
                    setProblem({
                        problemId: response.data.problemId, // ✅ 올바른 접근 방식
                        content: response.data.content, // ✅ 올바른 접근 방식
                    });
                    console.log("🟢 문제 데이터 설정됨:", response.data);
                } else {
                    const errorMessage =
                        response.data.message ||
                        "문제를 불러오는 데 실패했습니다.";
                    console.warn("⚠ 서버 응답 에러:", errorMessage);
                    setError(errorMessage);
                }
            } catch (err: any) {
                console.error("❌ API 요청 실패:", err);

                if (axios.isAxiosError(err)) {
                    console.error(
                        "🔍 Axios 오류:",
                        err.response?.data || err.message
                    );
                    setError(
                        `서버 오류: ${
                            err.response?.data?.message ||
                            "응답을 받지 못했습니다."
                        }`
                    );
                } else {
                    console.error("🛠 알 수 없는 오류:", err);
                    setError(
                        "문제를 불러오는 중 알 수 없는 오류가 발생했습니다."
                    );
                }
            } finally {
                setLoading(false);
            }
        };

        fetchProblem();
    }, []);

    return { problem, loading, error };
};
