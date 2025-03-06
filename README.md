## 📛프로젝트명 - 코드에이블(Codable)

#### Coding + able = codable (코팅을 잘할 수 있게 돕는다는 의미입니다!)

<br/>

## 🚧프로젝트 소개

접근하기 쉽고 재밌는 web IDE 제작하기
더 자세한 설명은 [여기](https://github.com/user-attachments/files/19094788/KDT.1.pdf)를 참고해주세요!

## 👩🏻‍💻 프로젝트 참여 인원

#### Frontend - 3명
#### Backend - 3명

## ✨ 기술 스택

- 기획디자인 : <img src="https://img.shields.io/badge/figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white">
- 프론트엔드 : <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=white"> <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=white" /> <img src="https://img.shields.io/badge/SCSS-CC6699?style=for-the-badge&logo=SASS&logoColor=white" /> <img src="https://img.shields.io/badge/Netlify-00C7B7?style=for-the-badge&logo=Netlify&logoColor=white" />

- 백엔드 : <img src="https://img.shields.io/badge/java-007396?style=for-the-badge&logo=java&logoColor=white"> <img src="https://img.shields.io/badge/spring Boot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white"> <img src="https://img.shields.io/badge/JPA-6DB33F?style=for-the-badge&logo=JPA&logoColor=white"/> <img src="https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white" /> <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" /> <img src="https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white" />
<img src="https://img.shields.io/badge/AWS EC2-232F3E?style=for-the-badge&logo=amazonaws&logoColor=white" /> <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" /> <img src="https://img.shields.io/badge/GitHub Actions-2088FF?style=for-the-badge&logo=githubactions&logoColor=white" />

- ETC : <img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white"> <img src="https://img.shields.io/badge/notion-000000?style=for-the-badge&logo=notion&logoColor=white">


## 💡 서비스 핵심 기능

**`웹 스터디 공간`**

<br/>

  - 팀만의 규칙 & 룰을 적용시킬 수 있는 웹 스터디 공간

<br/>

**`달력`**

<br/>

  - 당일 스터디 여부를 확인할 수 있습니다.
  - 문제, 채팅 기록을 확인할 수 있습니다.

<br/>

**`코드 편집기`**

<br/>

  - 코딩 테스트 문제 지원
  - JAVA, Python 지원

<br/>

**`채팅`**

<br/>

  - 코딩 테스트 이후 팀원간의 소통을 지원

<br/>

## 🖼️ 디자인

- 시작화면
<center><img src ="https://github.com/user-attachments/assets/395be0c1-c6a9-497d-b465-b87c74207c0f" /></center>

- 메인 화면 (스터디 화면)
<center> <img src ="https://github.com/user-attachments/assets/5099d0a8-fd32-418e-a17c-20abfdb56672" /></center>

- 코드 편집기 화면
<center> <img src ="https://github.com/user-attachments/assets/e6698f2b-d9cc-46fd-b511-655579bbc79e" /></center>

- 스터디 채팅 화면
<center> <img src ="https://github.com/user-attachments/assets/dd3b72fb-123f-4f4d-9f8e-ca906a36f85e" /></center>

## 🍆 본인이 구현한 기능

- 카카오 소셜 로그인 API 구현 - 카카오 개발자 문서에 있는 REDIRECT_URI, CLIENT_ID를 가지고 카카오에서 제공하는 code값을 가져온 후 인증 / 인가 처리하여 서버와 로그인 처리를 구현

- STOMP로 채팅 구현 - Client객체와 SockJS객체를 생성하여 onConnect메서드에서 서버의 URL을 구독하고 메시지 DTO 형식을 맞춰 send하고 connect가 유지되는 동안 메시지를 가져와 채팅 기능 구현

- useRef를 이용한 채팅 스크롤바 하단 고정 기능 구현

## 🚩 트러블 슈팅

### 1. 문제 - 카카오 소셜 로그인 인증 / 인가
#### 상황
- 카카오 인증/인가 처리 과정을 백엔드와 분담 후 맡은 부분에 대해 잘 구현이 되지 않음

#### 해결 방법
- 카카오 디펠로퍼 공식 문서를 통해 인증 / 인가 처리 과정을 공부 후 해결

#### 배운 점 
- 공식 문서를 통해 개발에 대한 이해를 높일 수 있는 자료가 많다는 걸 알게 되었다.

### 2. 문제 - SockJS 연결이 되지 않는 문제 발생
#### 상황
- SockJs 연결이 잘 되지 않는 상황이 발생

#### 해결 방법
- SockJs 깃허브 문서를 통해 메서드를 공부하고 로직에서 잘못된 부분을 수정

#### 배운 점 
- 깃허브 문서에서 메서드를 참고하는 것이 개발에 도움이 된다는 사실을 알게 되었다.
