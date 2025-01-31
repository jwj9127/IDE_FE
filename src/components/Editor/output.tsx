import React from "react";
import styles from "./output.module.scss";

interface OutputProps {
    onRun: () => void;
    output: string;
    message: string;
}

const Output: React.FC<OutputProps> = ({ onRun, output, message }) => {
    return (
        <div className={styles.output}>
            <div className={styles.content}>
                <div className={styles["content-title"]}>결과</div>
                <div className={styles["content-output"]}>
                    {output || "코드 실행 결과가 여기에 표시됩니다."}
                </div>
                <div className={styles["content-message"]}>
                    {message || "실행 상태 메시지가 여기에 표시됩니다."}
                </div>
            </div>
            <button className={styles.btn} onClick={onRun}>
                실행하기
            </button>
        </div>
    );
};

export default Output;
