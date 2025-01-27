import React, { useState, useEffect } from "react";
import MemberSection from "./MemberSection";
import RulesSection from "./RulesSection";
import CalendarSection from "./CalendarSection";

import styles from "./Study.module.scss";

type Member = {
    image: string;
    name: string;
};

const fetchKakaoMembers = async (): Promise<Member[]> => {
    return [
        { image: "https://via.placeholder.com/50", name: "홍길동" },
        { image: "https://via.placeholder.com/50", name: "김철수" },
        { image: "https://via.placeholder.com/50", name: "이영희" },
    ];
};

const Study = () => {
    const [members, setMembers] = useState<Member[]>([]);

    useEffect(() => {
        const loadMembers = async () => {
            const data = await fetchKakaoMembers();
            setMembers(data);
        };

        loadMembers();
    }, []);

    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();

    const calendar = Array(firstDay)
        .fill(null)
        .concat(Array.from({ length: lastDate }, (_, i) => i + 1));

    return (
        <div className={styles.container}>
            <div className={styles.frame}>
                <p>팀원분들이 들어오면 코딩을 시작합니다!</p>
                <div className={styles.innerFrame}>
                    <MemberSection members={members} />
                    <RulesSection />
                    <CalendarSection month={month} calendar={calendar} />
                </div>
                <div className={styles.buttonDiv}>
                    <button type="button" className={styles.problemButton}>
                        문제 풀기
                    </button>
                </div>
            </div>
        </div>

    );
};

export default Study;
