import React, { useEffect, useState } from "react";
import axios from "axios";
import "./question.scss";

interface ProblemData {
    problemId: number; // 문제 ID
    problemContent: string; // 문제 내용
}

const Question: React.FC = () => {
    const [problem, setProblem] = useState<ProblemData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProblem = async () => {
            try {
                setLoading(true);
                setError(null);

                const todayDate = new Date();
                const date =
                    todayDate.getFullYear().toString() + // 연도 (4자리)
                    "-" +
                    (todayDate.getMonth() + 1).toString().padStart(2, "0") + // 월 (2자리)
                    "-" +
                    todayDate.getDate().toString().padStart(2, "0") + // 일 (2자리)
                    "-" +
                    todayDate.getHours().toString().padStart(2, "0") + // 시 (2자리)
                    ":" +
                    todayDate.getMinutes().toString().padStart(2, "0") + // 분 (2자리)
                    ":" +
                    todayDate.getSeconds().toString().padStart(2, "0"); // 초 (2자리)

                console.log(date); // 예: "2025-01-25-03:11:25"

                const token = process.env.REACT_APP_API_KEY;

                const response = await axios.get(
                    `https://${process.env.REACT_APP_BASE_URL}/api/problem?date=${date}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
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

    if (loading) {
        return <div className="question">문제를 불러오는 중입니다...</div>;
    }

    if (error) {
        return <div className="question error">{error}</div>;
    }

    return (
        <div className="question">
            {problem ? (
                <>
                    <h2>문제 {problem.problemId}</h2>
                    <div>{problem.problemContent}</div>
                </>
            ) : (
                <div>문제를 찾을 수 없습니다.</div>
            )}
        </div>
    );
};

export default Question;
