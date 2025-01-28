import axios from "axios";

interface RunData {
    code: string;
    remainingTime: string;
}

export const useRun = () => {
    const runCode = async (data: RunData): Promise<void> => {
        try {
            const response = await axios.post("api주소", data);
            console.log("서버 응답:", response.data);
            alert("코드가 성공적으로 실행되었습니다.");
        } catch (error) {
            console.error("코드 실행 실패:", error);
            alert("코드 실행 중 오류가 발생했습니다.");
        }
    };

    return { runCode };
};
