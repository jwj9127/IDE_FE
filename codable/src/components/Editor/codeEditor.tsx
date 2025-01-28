import React, { useState } from "react";
import "./codeEditor.scss";
import { useTimer } from "../../hooks/useTimer";
import ModalTimer from "../../components/Modal/modalTimer";
import Editor, { OnMount } from "@monaco-editor/react";

const CodeEditor: React.FC = () => {
    const handleEditorDidMount: OnMount = (editor, monaco) => {
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
    };

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditorDisabled, setIsEditorDisabled] = useState(false);

    const { time } = useTimer({
        initialTime: 20 * 60, // 20분
        onFiveMinutesLeft: () => {
            setIsModalOpen(true); // 모달 열기
            setTimeout(() => setIsModalOpen(false), 3000); // 3초 후 모달 닫기
        },
        onTimeEnd: () => {
            setIsEditorDisabled(true); // 에디터 비활성화
        },
    });

    const formatTime = (seconds: number) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${hours.toString().padStart(2, "0")}:${minutes
            .toString()
            .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    };

    return (
        <>
            <div className="code-editor">
                <div className="timer">남은 시간 {formatTime(time)}</div>
                <div className="editor">
                    <Editor
                        height="100%"
                        defaultLanguage="javascript"
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
