import React, { useEffect, useRef, useState } from "react";
import "./codeEditor.scss";
import { useTimer } from "../../hooks/useTimer";
import ModalTimer from "../Modal/modalTimer";
import Editor, { OnMount } from "@monaco-editor/react";

interface CodeEditorProps {
    onMount: (editor: any, code: string, problemId: number) => void;
    problemId: number;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ onMount, problemId }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditorDisabled, setIsEditorDisabled] = useState(false);
    const editorRef = useRef<any>(null);

    const language = "python"; // 언어를 항상 Python으로 고정

    const getCode = () => editorRef.current?.getValue() || "";

    const { time } = useTimer({
        initialTime: 20 * 60,
        onFiveMinutesLeft: () => {
            setIsModalOpen(true);
            setTimeout(() => setIsModalOpen(false), 3000);
        },
        getCode,
        problemId,
        onTimeEnd: () => {
            setIsEditorDisabled(true);
        },
    });

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes.toString().padStart(2, "0")}:${secs
            .toString()
            .padStart(2, "0")}`;
    };

    const handleEditorDidMount: OnMount = (editor, monaco) => {
        editorRef.current = editor;

        // Define a custom theme for the editor
        monaco.editor.defineTheme("custom-dark", {
            base: "vs-dark",
            inherit: true,
            rules: [],
            colors: {
                "editor.background": "#1E1E1E",
                "editor.lineHighlightBackground": "#2E2E2E",
            },
        });
        monaco.editor.setTheme("custom-dark");

        // Pass necessary parameters to the onMount callback
        onMount(editor, getCode(), problemId);
    };

    useEffect(() => {
        if (editorRef.current) {
            onMount(editorRef.current, getCode(), problemId);
        }
    }, [time, onMount, problemId]);

    return (
        <>
            <div className="code-editor">
                <div className="timer">남은 시간 {formatTime(time)}</div>
                <div className="editor">
                    <Editor
                        height="100%"
                        defaultLanguage={language} // 언어를 Python으로 설정
                        defaultValue="// 여기에 코드를 입력하세요"
                        options={{
                            fontSize: 14,
                            minimap: { enabled: false },
                            scrollBeyondLastLine: false,
                            readOnly: isEditorDisabled,
                        }}
                        onMount={handleEditorDidMount}
                    />
                </div>
            </div>
            <ModalTimer
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </>
    );
};

export default CodeEditor;
