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
                <div className={styles["content-output"]}>{output}</div>
                <div className={styles["content-message"]}>{message}</div>
            </div>
            <button className={styles.btn} onClick={onRun}>
                실행하기
            </button>
        </div>
    );
};

export default Output;
