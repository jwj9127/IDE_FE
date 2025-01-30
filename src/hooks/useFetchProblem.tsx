import { useState, useEffect } from "react";
import axiosInstance from "../utils/axiosInstance";

interface ProblemData {
    problemId: number;
    problemContent: string;
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

                // API 호출
                const response = await axiosInstance.get(
                    `/api/problem?date=${date}`
                );

                if (response.data.code === 201) {
                    setProblem(response.data.data);
                } else {
                    setError(
                        response.data.message ||
                            "문제를 불러오는 데 실패했습니다."
                    );
                }
            } catch (err) {
                setError("문제를 불러오는 중 오류가 발생했습니다.");
            } finally {
                setLoading(false);
            }
        };

        fetchProblem();
    }, []);

    return { problem, loading, error };
};
