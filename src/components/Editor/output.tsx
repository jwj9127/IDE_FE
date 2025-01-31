import React from "react";
import "./output.scss";

interface OutputProps {
    onRun: () => void;
    output: string;
    message: string;
}

const Output: React.FC<OutputProps> = ({ onRun, output, message }) => {
    return (
        <div className="output">
            <div className="content">
                <div className="content-title">결과</div>
                <div className="content-output">{output}</div>
                <div className="content-message">{message}</div>
            </div>
            <button className="btn" onClick={onRun}>
                실행하기
            </button>
        </div>
    );
};

export default Output;
