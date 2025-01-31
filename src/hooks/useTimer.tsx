import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRun } from "./useRun";

interface TimerProps {
    initialTime: number;
    onFiveMinutesLeft?: () => void;
    getCode: () => string; // Monaco Editor에서 코드 가져오는 함수
    problemId: number;
    onTimeEnd?: () => void;
}

export const useTimer = ({
    initialTime,
    onFiveMinutesLeft,
    getCode,
    problemId,
    onTimeEnd,
}: TimerProps) => {
    const [time, setTime] = useState(initialTime);
    const { runCode } = useRun();
    const navigate = useNavigate();

    useEffect(() => {
        let timer: NodeJS.Timeout | null = null;

        if (time > 0) {
            timer = setInterval(() => {
                setTime((prevTime) => {
                    const newTime = prevTime - 1;

                    if (newTime === 5 * 60 && onFiveMinutesLeft) {
                        onFiveMinutesLeft();
                    }

                    if (newTime === 0) {
                        clearInterval(timer!);
                        handleTimeEnd(); // ✅ 시간이 종료되면 실행 후 이동
                    }

                    return newTime;
                });
            }, 1000);
        }

        return () => {
            if (timer) clearInterval(timer);
        };
    }, [time]);

    const handleTimeEnd = async () => {
        onTimeEnd?.();
        const code = getCode().trim();

        if (!code) {
            console.warn("🚨 실행할 코드가 없습니다.");
            navigate("/chat");
            return;
        }

        console.log("🚀 시간이 종료되어 자동 실행:", { problemId, code });

        try {
            // ✅ language를 항상 "python"으로 설정
            await runCode({ code, problemId, language: "python" });
            navigate("/chat"); // 실행 완료 후 이동
        } catch (error) {
            console.error("🚨 코드 실행 중 오류 발생:", error);
            navigate("/error"); // 에러 발생 시 에러 페이지로 이동
        }
    };

    return { time };
};
