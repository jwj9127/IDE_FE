import React, { useRef, useState } from "react";
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

    const handleCodeEditorMount = (editor: any) => {
        editorRef.current = editor;
    };

    const handleProblemLoad = (id: number) => {
        setProblemId(id);
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

        console.log("📡 코드 실행 요청:", {
            code,
            problemId,
            language: "python",
        });

        const result = await runCode({ code, problemId, language: "python" });
        setOutput(result);
    };

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
                    <div className="editor-placeholder">
                        문제를 선택해주세요.
                    </div>
                )}
                <Output onRun={handleRun} output={output} />
            </div>
        </div>
    );
};

export default Editor;
