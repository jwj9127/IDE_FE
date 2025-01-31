import React, { useEffect } from "react";
import { useFetchProblem } from "../../hooks/useFetchProblem";
import styles from "./question.module.scss";

interface QuestionProps {
    onProblemLoad: (id: number) => void;
}

const Question: React.FC<QuestionProps> = ({ onProblemLoad }) => {
    const { problem, loading, error } = useFetchProblem();

    useEffect(() => {
        if (problem) {
            onProblemLoad(problem.problemId);
        }
    }, [problem, onProblemLoad]);

    if (loading) {
        return (
            <div className={styles.question}>문제를 불러오는 중입니다...</div>
        );
    }

    if (error) {
        return <div className={styles.question}>{error}</div>;
    }

    if (!problem) {
        return <div className={styles.question}>문제를 찾을 수 없습니다.</div>;
    }

    return (
        <div className={styles.question}>
            <h2>문제 {problem.problemId}</h2>
            <div className={styles["question-problem"]}>{problem.content}</div>
        </div>
    );
};

export default Question;
