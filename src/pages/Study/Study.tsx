import { useState, useEffect } from "react";
import axiosInstance from "../../utils/axiosInstance"; 
import MemberSection from "./MemberSection";
import RulesSection from "./RulesSection";
import CalendarSection from "./CalendarSection";

import styles from "./Study.module.scss";
import { useNavigate } from "react-router-dom";

type Member = {
    name: string;
};

const Study = () => {
    // 전체 멤버 정보 상태
    const [members, setMembers] = useState<Member[]>([]);
    // 로그인한 멤버 정보 상태
    const [loginMember, setLoginMember] = useState<Member | null>(null);

    // 로그인한 멤버 정보 가져오기 (localStorage에서)
    useEffect(() => {
        const storedName = localStorage.getItem("name");
        if (storedName) {
            setLoginMember({ name: storedName });
        }
    }, []);

    // 전체 멤버 정보 가져오기 (실시간 업데이트 가능하도록 설정)
    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const response = await axiosInstance.get("/api/study"); 
                
                if (response.data.code === 201) {
                    const formattedMembers: Member[] = response.data.data.memberList.map(
                        (member: { username: string }) => ({
                            name: member.username,
                        })
                    );
                    setMembers(formattedMembers);
                } else {
                    console.error("스터디 정보를 불러오는데 실패했습니다.");
                }
            } catch (error) {
                console.error("API 요청 중 오류 발생:", error);
            }
        };

        // 첫 실행
        fetchMembers();

        // 주기적으로 멤버 리스트 업데이트 (5초마다 실행)
        const intervalId = setInterval(fetchMembers, 5000);

        // 컴포넌트 언마운트 시 interval 제거
        return () => clearInterval(intervalId);
    }, []);

    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();

    const calendar = Array(firstDay)
        .fill(null)
        .concat(Array.from({ length: lastDate }, (_, i) => i + 1));

    const todayDate = now.getDate();

    const navigate = useNavigate();
    const onClick = () => {
        navigate("/editor");
    };

    return (
        <div className={styles.container}>
            <div className={styles.frame}>
                <p>팀원분들이 들어오면 코딩을 시작합니다!</p>
                <div className={styles.innerFrame}>
                    <MemberSection members={members} loginMember={loginMember} />
                    <RulesSection />
                    <CalendarSection month={month} calendar={calendar} todayDate={todayDate} />
                </div>
                <div className={styles.buttonDiv}>
                    <button type="button" className={styles.problemButton} onClick={onClick}>
                        문제 풀기
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Study;
