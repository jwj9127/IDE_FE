import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Client } from "@stomp/stompjs";
import deleteIcon from "../../assets/delete.png";
import "./Chat.scss";

// Kakao SDK 로드 함수
declare const Kakao: any;

const Chat: React.FC = () => {
  const [stompClient, setStompClient] = useState<Client | null>(null); // STOMP Client 상태 관리
  const [messages, setMessages] = useState<{ user: string; text: string }[]>([]); // 채팅 메시지 상태
  const [input, setInput] = useState(""); // 입력 필드 상태
  const [userNickname, setUserNickname] = useState<string>(""); // 사용자 닉네임 상태
  const BASE_URL = process.env.REACT_APP_BASE_URL; // 환경 변수로 BASE_URL 설정
  const webSocketURL = `ws://${BASE_URL}/chat`; // WebSocket 연결 URL
  const studyName = "testStudy"; // 스터디 이름 (동적으로 변경 가능)

  // 카카오 로그인 초기화
  useEffect(() => {
    if (!Kakao.isInitialized()) {
      Kakao.init(process.env.REACT_APP_KAKAO_API_KEY); // 환경 변수에서 Kakao API Key 로드
      console.log("Kakao SDK initialized:", Kakao.isInitialized());
    }

    // 카카오 로그인 세션 확인
    if (Kakao.Auth.getAccessToken()) {
      Kakao.API.request({
        url: "/v2/user/me",
        success: (response: any) => {
          const nickname = response.properties.nickname; // 닉네임 가져오기
          setUserNickname(nickname);
        },
        fail: (error: any) => {
          console.error("Failed to fetch user info:", error);
        },
      });
    } else {
      console.warn("No active Kakao session found.");
    }
  }, []);

  useEffect(() => {
    // STOMP Client 설정 및 WebSocket 연결
    const client = new Client({
      brokerURL: webSocketURL, // WebSocket URL
      connectHeaders: {
        login: "user", // 임시 사용자 정보
        passcode: "password",
      },
      debug: (str) => console.log(str), // 디버그 메시지 로깅
      reconnectDelay: 5000, // 재연결 딜레이
      heartbeatIncoming: 4000, 
      heartbeatOutgoing: 4000, 
    });

    client.onConnect = () => {
      console.log("WebSocket connected");

      // 채팅 메시지 구독
      client.subscribe(`/subscribe/chat/room/${studyName}`, (message) => {
        if (message.body) {
          const receivedMessage = JSON.parse(message.body);
          setMessages((prev) => [...prev, receivedMessage]); // 새로운 메시지 추가
        }
      });

      // 메시지 히스토리 구독 (날짜별 히스토리)
      const today = new Date().toISOString().slice(0, 10); // 오늘 날짜를 ISO 형식으로 가져오기
      client.subscribe(`/chat/history/${studyName}/${today}`, (message) => {
        if (message.body) {
          const history = JSON.parse(message.body);
          setMessages(history); // 히스토리로 메시지 초기화
        }
      });

      setStompClient(client); // STOMP Client 설정
    };

    client.activate(); // WebSocket 활성화

    return () => {
      client.deactivate(); // 컴포넌트 언마운트 시 WebSocket 비활성화
      console.log("WebSocket disconnected");
    };
  }, [webSocketURL, studyName]);

  // 메시지 전송 함수
  const sendMessage = () => {
    if (input.trim() && stompClient && userNickname) {
      const message = {
        studyName: studyName, // 스터디 이름
        sender: userNickname, // 발신자 닉네임
        message: input, // 채팅 메시지
        timestamp: new Date().toISOString(), // 현재 시간
      };

      // STOMP로 메시지 전송
      stompClient.publish({
        destination: "/publish/room", // 메시지 전송 대상
        body: JSON.stringify(message), // JSON 형식으로 메시지 변환
      });

      setInput(""); // 입력 필드 초기화
    }
  };

  // Enter 키를 눌렀을 때 메시지 전송
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div className="chat-container">
      {/* 상단 헤더 */}
      <div className="chat-ground">
        {/* 사용자 닉네임 표시 */}
        <div className="user-info">
          <h2>{userNickname || "사용자 정보 로딩 중..."}</h2>
        </div>

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

      {/* 삭제 아이콘 */}
      <div className="deleteIcon">
        <Link to="/study">
          <img src={deleteIcon} alt="delete" className="delete-image" />
        </Link>
      </div>
    </div>
  );
};

export default Chat;

