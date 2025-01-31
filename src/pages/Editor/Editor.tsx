import React, { useRef, useState, useEffect } from "react";
import "./Editor.scss";
import Question from "../../components/Editor/question";
import Output from "../../components/Editor/output";
import CodeEditor from "../../components/Editor/codeEditor";
import { useRun } from "../../hooks/useRun";

const Editor: React.FC = () => {
    const editorRef = useRef<any>(null);
    const [problemId, setProblemId] = useState<number | null>(null);
    const { runCode } = useRun();
    const [output, setOutput] = useState<string>("");
    const [message, setMessage] = useState<string>("");

    const saveCodeToLocalStorage = () => {
        if (editorRef.current) {
            const code = editorRef.current.getValue()?.trim();
            if (code) {
                localStorage.setItem("code", code); // 코드 저장
            }
        }
    };

    const handleCodeEditorMount = (editor: any) => {
        editorRef.current = editor;
    };

    const handleProblemLoad = (id: number) => {
        setProblemId(id);
        localStorage.setItem("problemId", id.toString());
    };

    const handleRun = async () => {
        if (!editorRef.current) {
            alert("코드 편집기가 로드되지 않았습니다.");
            return;
        }

        if (problemId === null) {
            alert("문제 ID를 가져올 수 없습니다.");
            return;
        }

        const code = editorRef.current.getValue()?.trim();

        if (!code) {
            alert("코드를 입력해주세요.");
            return;
        }

        const result = await runCode({ code, problemId, language: "python" });
        setOutput(result.extractedResults);
        setMessage(result.message);
    };

    useEffect(() => {
        const interval = setInterval(saveCodeToLocalStorage, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="content">
            <div className="question-content">
                <Question onProblemLoad={handleProblemLoad} />
            </div>
            <div className="editor-content">
                {problemId !== null ? (
                    <CodeEditor
                        onMount={handleCodeEditorMount}
                        problemId={problemId}
                    />
                ) : (
                    <div className="editor-placeholder"></div>
                )}
                <Output onRun={handleRun} output={output} message={message} />
            </div>
        </div>
    );
};

export default Editor;
