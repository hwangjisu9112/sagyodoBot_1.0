const cron = require('node-cron');
const moment = require('moment-timezone');

const fs = require('fs');
const path = require('path');

const holidayPath = path.join(__dirname, './holiday.json');
const holiday = JSON.parse(fs.readFileSync(holidayPath, 'utf8'));


function dailyMessage() {
    const today = moment().tz('Asia/Seoul').format('MM-DD'); // 오늘 날짜 (KST)
    if (holiday[today]) {
        return holiday[today]; // 공휴일 메시지
    }
    return '오늘 하루도 고생하셨습니다';
}

/**
 * 매일 특정 시간 반복하여 인사를 하는 기능.
 *
 * @param {import('discord.js').Client} client - Discord 클라이언트 객체
 * @param {string} guildId - 메시지를 보낼 서버의 ID
 * @param {string} notificationChannelId - 메시지를 보낼 채널의 ID
 */
function morningCall(client, guildId, notificationChannelId) {
    // 매일 오전 8시에 실행(개량 필요)
    cron.schedule('0 8 * * *', async () => {
        try {
            const guild = await client.guilds.fetch(guildId); // 서버 정보 가져오기
            const channel = guild.channels.cache.get(notificationChannelId); // 채널 ID로 채널 가져오기
            const message = dailyMessage(); // 오늘의 맞춤 인삿말 결정


            if (channel && channel.isTextBased()) {
                //   아침인사
                channel.send(message); 
                console.log(`[INFO] 아침 인사 메시지를 ${channel.name} 채널에 전송했습니다.`);
            } else {
                console.error(`[ERROR] 알림 채널을 찾을 수 없거나, 채널이 텍스트 채널이 아닙니다.`);
            }
        } catch (error) {
            console.error(`[ERROR] 아침 인사 메시지 전송 중 오류 발생:`, error);
        }
    });
}

module.exports = morningCall;