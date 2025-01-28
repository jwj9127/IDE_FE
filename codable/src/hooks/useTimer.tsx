import { useState, useEffect } from "react";

export interface TimerProps {
    initialTime: number; // 초기 시간 (초 단위)
    onFiveMinutesLeft?: () => void; // 5분 남았을 때 호출되는 콜백
    onTimeEnd?: () => void; // 시간이 종료되었을 때 호출되는 콜백
}

export const useTimer = ({
    initialTime,
    onFiveMinutesLeft,
    onTimeEnd,
}: TimerProps) => {
    const [time, setTime] = useState(initialTime);

    useEffect(() => {
        let timer: NodeJS.Timeout | null = null;

        if (time > 0) {
            timer = setInterval(() => {
                setTime((prevTime) => {
                    const newTime = prevTime - 1;

                    if (newTime === 5 * 60 && onFiveMinutesLeft) {
                        onFiveMinutesLeft(); // 5분 남았을 때 실행
                    }

                    if (newTime === 0 && onTimeEnd) {
                        onTimeEnd(); // 시간이 종료되었을 때 실행
                        clearInterval(timer!); // 타이머 종료
                    }

                    return newTime;
                });
            }, 1000);
        }

        return () => {
            if (timer) clearInterval(timer);
        };
    }, [time, onFiveMinutesLeft, onTimeEnd]);

    return {
        time,
    };
};
