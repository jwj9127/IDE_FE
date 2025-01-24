import React from "react";
import "./codeEditor.scss";
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

    return (
        <div className="code-editor">
            <div className="timer">남은 시간 00:00:00</div>
            <div className="editor">
                <Editor
                    height="100%"
                    defaultLanguage="javascript"
                    defaultValue="// 여기에 코드를 입력하세요"
                    options={{
                        fontSize: 14,
                        minimap: { enabled: false },
                        scrollBeyondLastLine: false,
                    }}
                    onMount={handleEditorDidMount}
                />
            </div>
        </div>
    );
};

export default CodeEditor;
