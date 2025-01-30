import { useState, useEffect } from "react";
import axiosInstance from "../../utils/axiosInstance"; 
import MemberSection from "./MemberSection";
import RulesSection from "./RulesSection";
import CalendarSection from "./CalendarSection";

import basicImage from "../../assets/female.png";
import styles from "./Study.module.scss";
import { useNavigate } from "react-router-dom";


type Member = {
    image: string;
    name: string;
};

const Study = () => {
    const [members, setMembers] = useState<Member[]>([]);

    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const response = await axiosInstance.get("/api/study"); 
                console.log("🟡 요청 URL:", axiosInstance.defaults.baseURL + "/api/study");
                console.log("🟢 [API 응답 성공]");
                console.log("응답 전체:", response);
                console.log("응답 데이터:", response.data);
                if (response.data.code === 201) {
                    const formattedMembers: Member[] = response.data.data.memberList.map(
                        (member: { username: string; profileImage: string }) => ({
                            image: member.profileImage || basicImage,
                            name: member.username,
                        })
                    );
                    setMembers(formattedMembers);
                } else {
                    console.error("스터디 정보를 불러오는데 실패했습니다.");
                    // 로그 출력용 코드
                    console.log("response.data.code = ", response.data.code);
                    console.log("response.data = ", response.data);
                    console.log("process.env.REACT_APP_BASE_URL = ", process.env.REACT_APP_BASE_URL);
                }
            } catch (error) {
                console.error("API 요청 중 오류 발생:", error);
            }
        };

        fetchMembers();
    }, []);

    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();

    const calendar = Array(firstDay)
        .fill(null)
        .concat(Array.from({ length: lastDate }, (_, i) => i + 1));

    const navigate = useNavigate();
    const onClick = () => {
        navigate("/editor");
    }

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
                    <button type="button" className={styles.problemButton} onClick={() => onClick()}>
                        문제 풀기
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Study;
