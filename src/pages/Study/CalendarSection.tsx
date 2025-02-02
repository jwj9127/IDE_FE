import React, { useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import studyYes from "../../assets/studyYes.png";
import studyNo from "../../assets/studyNo.png";
import styles from "./CalendarSection.module.scss";
import questionX from "../../assets/questionX.png";
import chattingX from "../../assets/chattingX.png";

interface CalendarSectionProps {
    month: number;
    calendar: (number | null)[];
    todayDate: number;
}

interface ChatMessage {
    username: string;
    profileImage: string;
    content: string;
    sendAt: string;
}

interface CodeData {
    problemContent: string;
    code: string;
    isSolve: boolean;
    solveTime: string;
}

const CalendarSection = ({ month, calendar, todayDate }: CalendarSectionProps) => {
    const [selectedDate, setSelectedDate] = useState<number | null>(null);
    const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
    const [codeData, setCodeData] = useState<CodeData | null>(null);
    const [studyImage, setStudyImage] = useState<{ [key: number]: string }>({});
    const [popupPosition, setPopupPosition] = useState<{ top: string; left: string }>({ top: "100%", left: "50%" });

    const handleDateClick = async (date: number, event: React.MouseEvent<HTMLTableCellElement>) => {
        setSelectedDate(selectedDate === date ? null : date);

        const td = event.currentTarget;
        const rect = td.getBoundingClientRect();
        const calendarRect = td.closest("table")?.getBoundingClientRect();

        if (calendarRect) {
            const isLastRow = rect.bottom + 100 > calendarRect.bottom;
            const isRightEdge = rect.right + 120 > calendarRect.right;
            const isLeftEdge = rect.left - 120 < calendarRect.left;

            let top = isLastRow ? "-145%" : "100%";
            let left = isRightEdge ? "-100%" : isLeftEdge ? "70%" : "50%";

            setPopupPosition({ top, left });
        }

        try {
            const chatResponse = await axiosInstance.get(`/api/chats?date=${date}`);
            const codeResponse = await axiosInstance.get(`/api/code?date=${date}`);

            if (chatResponse.data.code === 201 && codeResponse.data.code === 201) {
                const isChatJoin = chatResponse.data.data.isJoin;
                const isCodeJoin = codeResponse.data.data.isJoin;

                setStudyImage((prev) => ({
                    ...prev,
                    [date]: isChatJoin && isCodeJoin ? studyYes : studyNo,
                }));

                if (isChatJoin) {
                    setChatHistory(chatResponse.data.data.chatHistoryList);
                } else {
                    setChatHistory([]);
                }

                if (isCodeJoin) {
                    setCodeData({
                        problemContent: codeResponse.data.data.problemContent,
                        code: codeResponse.data.data.code,
                        isSolve: codeResponse.data.data.isSolve,
                        solveTime: codeResponse.data.data.solveTime,
                    });
                } else {
                    setCodeData(null);
                }
            }
        } catch (error) {
            console.error("데이터 로드 실패:", error);
        }
    };

    return (
        <div className={styles.calendarFrame}>
            <div className={styles.calendar}>
                <header>
                    <p>{month + 1}월</p>
                </header>
                <table>
                    <thead>
                        <tr>
                            {["월", "화", "수", "목", "금", "토", "일"].map((day, idx) => (
                                <th key={idx}>{day}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {Array.from({ length: Math.ceil(calendar.length / 7) }, (_, rowIdx) => (
                            <tr key={rowIdx}>
                                {calendar.slice(rowIdx * 7, rowIdx * 7 + 7).map((date, colIdx) => (
                                    <td
                                        key={colIdx}
                                        className={date ? styles.dateCell : styles.empty}
                                        onClick={(event) => date && handleDateClick(date, event)}
                                    >
                                        {date && <p>{date}</p>}

                                        {date && date < todayDate && ( 
                                            <img
                                                src={studyImage[date] || studyNo}
                                                alt="스터디 상태"
                                                className={styles.studyIcon}
                                            />
                                        )}

                                        {selectedDate === date && date && (
                                            <div
                                                className={styles.popup}
                                                style={{ top: popupPosition.top, left: popupPosition.left }}
                                            >
                                                <button className={styles.questionButton}>
                                                    <img className="question-img" src={questionX} alt="문제풀이" />
                                                </button>
                                                <button className={styles.chattingButton}>
                                                    <img className="chatting-img" src={chattingX} alt="채팅" />
                                                </button>
                                            </div>
                                        )}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CalendarSection;
