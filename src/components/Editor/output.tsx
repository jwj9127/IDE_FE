import React from "react";
import "./output.scss";

interface OutputProps {
    onRun: () => void;
}

const Output: React.FC<OutputProps> = ({ onRun }) => {
    return (
        <div className="output">
            <div className="content">결과</div>
            <button className="btn" onClick={onRun}>
                실행하기
            </button>
        </div>
    );
};

export default Output;
