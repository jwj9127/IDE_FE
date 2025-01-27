# Node.js 이미지를 베이스로 사용
FROM node:22.13.0 as build-stage

# 작업 디렉토리 설정
WORKDIR /app

# 의존성 파일 복사 및 설치
COPY package*.json ./
RUN npm install

# 앱 소스 복사
COPY . .

# 프로덕션을 위한 앱 빌드
RUN npm run build

# Nginx 스테이지
FROM nginx:stable-alpine as production-stage

# 빌드된 파일을 Nginx 서버로 복사
COPY --from=build-stage /app/build /usr/share/nginx/html

# 포트 80을 열고 Nginx를 실행
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
