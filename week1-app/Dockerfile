#FROM: 어떤 베이스 이미지에서 시작할지
#WORKDIR: 컨테이너 안에서 작업할 디렉토리 설정
#COPY: 호스트의 파일을 컨테이너 안으로 복사. COPY <호스트 경로> <컨테이너 경로> 형식
#RUN: 컴파일 시점에 실행되는 명령
#CMD: 런타임에 실행되는 명령
#EXPOSE: 컨테이너가 사용하는 포트 (필수는 아니고 관례)


FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app ./
EXPOSE 3000
CMD ["node", "server.js"]