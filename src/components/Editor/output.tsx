import React from "react";
import "./output.scss";

interface OutputProps {
    onRun: () => void;
    output: string;
    message: string; // message prop 추가
}

const Output: React.FC<OutputProps> = ({ onRun, output, message }) => {
    return (
        <div className="output">
            <div className="content">
                <div className="content-title">결과</div>
                <div className="content-output">
                    {output || "코드 실행 결과가 여기에 표시됩니다."}
                </div>
                <div className="content-message">
                    {message || "실행 상태 메시지가 여기에 표시됩니다."}
                </div>
            </div>
            <button className="btn" onClick={onRun}>
                실행하기
            </button>
        </div>
    );
};

export default Output;
