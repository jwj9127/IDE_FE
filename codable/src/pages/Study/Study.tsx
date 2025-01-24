import React from 'react';
import './Study.scss';
import memberImage from './img/memberImage.png';

const Study: React.FC = () => {
  const name: string = "&&";

  // 현재 날짜와 월 정보를 가져오기
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth(); // 0부터 시작 (0: 1월)
  const firstDay = new Date(year, month, 1).getDay(); // 이번 달의 첫 번째 요일
  const lastDate = new Date(year, month + 1, 0).getDate(); // 이번 달의 마지막 날짜

  // 달력 데이터를 생성
  const calendar: (number | null)[] = Array(firstDay).fill(null).concat(
    Array.from({ length: lastDate }, (_, i) => i + 1)
  );

  return (
    <div className="frame">
      <p>팀원분들이 들어오면 코딩을 시작합니다!</p>
      <div className="innerFrame">
        {/* 멤버 섹션 */}
        <div className="membersFrame">
          {[...Array(3)].map((_, idx) => (
            <div className="memberDiv" key={idx}>
              <img src={memberImage} alt="Member" />
              <p>{name}님</p>
            </div>
          ))}
        </div>

        {/* 설명 및 룰 섹션 */}
        <div className="rulesText">
          <p>설명 & 룰</p>
          <div className="subText">
            <ul>
              {Array(5).fill("최대한 검색하지 않고 자신의 실력으로 코딩하기").map((rule, idx) => (
                <li key={idx}>{rule}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* 달력 섹션 {year}년 */}
        <div className="calendarFrame">
          <div className="calendar">
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
                      <td key={colIdx} className={date ? '' : 'empty'}>
                        <p>{date || ''}</p>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className='buttonDiv'>
        <button className="problemButton">문제 풀기</button>
      </div>
    </div>
  );
};

export default Study;
