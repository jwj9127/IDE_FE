import React, { useRef } from "react";
import "./Editor.scss";
import Question from "../../components/Editor/question";
import Output from "../../components/Editor/output";
import CodeEditor from "../../components/Editor/codeEditor";
import { useRun } from "../../hooks/useRun"; // 서버로 데이터를 전송하는 훅

const Editor: React.FC = () => {
    const editorRef = useRef<any>(null); // CodeEditor의 Monaco Editor 참조
    const remainingTimeRef = useRef<string>(""); // 남은 시간 저장
    const { runCode } = useRun(); // 서버로 데이터를 전송하는 훅

    // CodeEditor에서 Monaco Editor와 남은 시간을 전달받는 함수
    const handleCodeEditorMount = (editor: any, time: string) => {
        editorRef.current = editor; // Monaco Editor 인스턴스 저장
        remainingTimeRef.current = time; // 남은 시간 저장
    };

    // 실행하기 버튼 클릭 시 호출되는 함수
    const handleRun = async () => {
        if (editorRef.current) {
            const code = editorRef.current.getValue(); // Monaco Editor에서 코드 가져오기
            const remainingTime = remainingTimeRef.current; // 저장된 남은 시간 가져오기
            await runCode({ code, remainingTime }); // 서버로 데이터 전송
        }
    };

    return (
        <div className="content">
            <div className="question-content">
                <Question />
            </div>

            <div className="editor-content">
                {/* CodeEditor에 handleCodeEditorMount 전달 */}
                <CodeEditor onMount={handleCodeEditorMount} />
                <Output onRun={handleRun} />
            </div>
        </div>
    );
};

export default Editor;
