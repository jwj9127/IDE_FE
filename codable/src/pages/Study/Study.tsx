import React, { useState, useEffect } from "react";
import "./Study.scss";

type Member = {
    image: string;
    name: string;
};

const fetchKakaoMembers = async (): Promise<Member[]> => {
    // TODO: 카카오 API로부터 멤버 데이터를 받아오는 로직 추가 필요
    // 우선은 return 값은 mock data로 예상해서 넣어둠
    return [
        { image: "https://via.placeholder.com/50", name: "홍길동" },
        { image: "https://via.placeholder.com/50", name: "김철수" },
        { image: "https://via.placeholder.com/50", name: "이영희" },
    ];
};

const Study: React.FC = () => { // React.FC 타입지정 불필요
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
        <div className="container">
            <div className="frame">
                <p>팀원분들이 들어오면 코딩을 시작합니다!</p>
                <div className="innerFrame">
                    {/* 멤버 섹션 */}
                    <div className="membersFrame">
                        {members.map((member, idx) => (
                            <div className="memberDiv" key={idx}>
                                <img src={member.image} alt="Member" />
                                <p>{member.name}님</p>
                            </div>
                        ))}
                    </div>

                    {/* 설명 및 룰 섹션 */}
                    <div className="rulesText">
                        <p>설명 & 룰</p>
                        <div className="subText">
                            <ul>
                                {Array(5)
                                    .fill(
                                        "최대한 검색하지 않고 자신의 실력으로 코딩하기"
                                    )
                                    .map((rule, idx) => (
                                        <li key={idx}>{rule}</li>
                                    ))}
                            </ul>
                        </div>
                    </div>

                    {/* 달력 섹션 */}
                    <div className="calendarFrame">
                        <div className="calendar">
                            <header>
                                <p>{month + 1}월</p>
                            </header>
                            <table>
                                <thead>
                                    <tr>
                                        {[
                                            "월",
                                            "화",
                                            "수",
                                            "목",
                                            "금",
                                            "토",
                                            "일",
                                        ].map((day, idx) => (
                                            <th key={idx}>{day}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {Array.from(
                                        {
                                            length: Math.ceil(
                                                calendar.length / 7
                                            ),
                                        },
                                        (_, rowIdx) => (
                                            <tr key={rowIdx}>
                                                {calendar
                                                    .slice(
                                                        rowIdx * 7,
                                                        rowIdx * 7 + 7
                                                    )
                                                    .map((date, colIdx) => (
                                                        <td
                                                            key={colIdx}
                                                            className={
                                                                date
                                                                    ? ""
                                                                    : "empty"
                                                            }
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
                </div>
                <div className="buttonDiv">
                    <button type="button" className="problemButton">문제 풀기</button>
                </div>
            </div>
        </div>
    );
};

export default Study;
