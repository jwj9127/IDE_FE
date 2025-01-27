import React from "react";
import styles from "./CalendarSection.module.scss";

interface CalendarSectionProps {
    month: number;
    calendar: (number | null)[];
}

const CalendarSection = ({ month, calendar }: CalendarSectionProps) => {
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
                        {Array.from(
                            { length: Math.ceil(calendar.length / 7) },
                            (_, rowIdx) => (
                                <tr key={rowIdx}>
                                    {calendar
                                        .slice(rowIdx * 7, rowIdx * 7 + 7)
                                        .map((date, colIdx) => (
                                            <td
                                                key={colIdx}
                                                className={date ? "" : styles.empty}
                                            >
                                                <p>{date || ""}</p>
                                            </td>
                                        ))}
                                </tr>
                            )
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CalendarSection;
