기존 버전 = https://github.com/hwangjisu9112/sagyodoBot

sagyodoBot은 디스코드 그룹 <<TRPG집회소>>에서 비영리적 목적으로 사용하기 위해 개발중인 디스코드 봇 입니다.

◇ 개발에 사용한 환경 및 언어
node.js v20.10.0

discord.js 14.15.2
eslint 9.1.1
google cloud plattform

◇ 봇 사용법

1. 본인의 디스코드 봇 토큰 만들기

https://discord.com/developers/docs/quick-start/getting-started

에 접속하여 자신의 디스코드 봇을 만든다. 디스코드 봇의 토큰과 봇의 고유 아이디를 확인한다.

2. config.json 파일 작성

이 코딩뭉치의 디렉토리 안에 config.json파일 작성 후 config.json에 1단계에서 만든 디스코드 봇 토큰을 "TOKEN" : "-" 안에 입력한다. 디스코드 봇의 아이디는 "CLIENT_ID" : "-"에 입력한다.

3. 명령어 배포를 위한 서버 아이디 확인

1단계에서 에서 만든 봇을 본인이 사용할 채널에 초대한 후, 디스코드 서버 아이디를 확인하여 config.json의 "GUILD_ID" : "-"에 입력한다.

4. 작동법

봇이 정상적으로 내 서버에 초대되었다면, 비쥬얼 스튜디오 등의 터미널에서 아래의 명령어들을 순서대로 입력한다.

①　npm install 

②　node .\deploy.js

③　node .\main.js





