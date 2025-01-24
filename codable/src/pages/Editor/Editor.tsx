import React from "react";
import "./Editor.scss";
import Question from "../../components/Editor/question";
import Output from "../../components/Editor/output";
import CodeEditor from "../../components/Editor/codeEditor";

const Editor: React.FC = () => {
    return (
        <div className="content">
            <div className="question-content">
                <Question />
            </div>

            <div className="editor-content">
                <CodeEditor />
                <Output />
            </div>
        </div>
    );
};

export default Editor;
