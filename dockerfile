# Node.js 공식 이미지 사용 (LTS 버전)
FROM node:20-alpine

# 작업 디렉토리 설정
WORKDIR /app

# package.json과 package-lock.json 복사
COPY package*.json ./

# 의존성 설치
RUN npm ci --only=production

# 소스 코드 복사
COPY . .

# 봇이 사용할 포트 (필요한 경우)
# EXPOSE 3000

# 애플리케이션 실행
CMD ["node", "main.js"]