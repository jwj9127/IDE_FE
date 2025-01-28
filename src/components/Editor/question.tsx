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

                const date = new Date().toISOString().split("T")[0];

                const response = await axios.get(`API 주소`, {
                    headers: {
                        Authorization: "token",
                    },
                });

                if (response.data.code === 201) {
                    setProblem(response.data.data);
                } else {
                    setError("문제를 불러오는 데 실패했습니다.");
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
