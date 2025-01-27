import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import deleteIcon from '../../assets/delete.png';
import "./Chat.scss";

const Chat: React.FC = () => {
  // 채팅 메시지 상태 (닉네임과 텍스트를 저장)
  const [messages, setMessages] = useState<{ user: string; text: string }[]>([]);
  const [input, setInput] = useState(""); // 입력 필드 상태
  const userNickname = "코딩왕비빔밥님"; // 현재 사용자의 닉네임 (Kakao API로 가져와야 함)

  // 메시지 전송 함수
  const sendMessage = () => {
    if (input.trim()) {
      setMessages([...messages, { user: userNickname, text: input }]); // 입력한 메시지를 상태에 추가
      setInput(""); // 입력 필드 초기화
    }
  };

  // Enter 키를 눌렀을 때 메시지 전송
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") sendMessage();
  };

  // "나가기" 버튼 클릭 시 페이지 이동 (window.location 사용)
  const handleExit = () => {
    window.location.href = "/study"; // "/study" 경로로 이동
  };

  return (
    <div className="chat-container">
      {/* 상단 헤더 */}
        <div className="chat-ground">
      {/* 채팅 메시지 박스 */}
        <div className="chat-box">
          {messages.map((msg, index) => (
            <div
            key={index}
            className={`chat-message ${
              msg.user === userNickname ? "my-message" : "other-message"
            }`}
            >
            {/* 닉네임 표시 */}
            <span className="nickname">{msg.user}</span>
            <p>{msg.text}</p>
          </div>
        ))}
      </div>

      {/* 하단 입력 및 버튼 */}
      <footer className="chat-footer">
        <input
          type="text"
          placeholder="채팅을 입력해주세요."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          />
        <button onClick={sendMessage}>보내기</button>
      </footer>
    </div>
    <div className="deleteIcon">
                <Link to="/study">
                    <img src={deleteIcon} alt="delete" className="delete-image"/>
                </Link>
            </div>
  </div>
  );
};

export default Chat;