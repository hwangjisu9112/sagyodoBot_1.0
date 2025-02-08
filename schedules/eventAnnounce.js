const cron = require('node-cron');

/**
 * 이벤트 알림 기능
 *
 * @param {import('discord.js').Client} client - Discord 클라이언트 객체
 * @param {string} guildId - 이벤트를 확인할 서버 ID
 * @param {string} notificationChannelId - 알림을 보낼 채널 ID
 */
function eventAnnounce(client, guildId, notificationChannelId) {
    const notifiedEvents = new Set(); // 이미 알림을 보낸 이벤트를 추적하기 위한 Set

    const checkEvents = async () => {
        try {
            const guild = await client.guilds.fetch(guildId); // 서버 정보 가져오기
            const events = await guild.scheduledEvents.fetch(); // 서버의 모든 이벤트 가져오기
            const now = new Date();

            
            events.forEach(event => {
                const startTime = new Date(event.scheduledStartTimestamp); // 이벤트 시작 시간
                const leftTime = (startTime - now) / (1000 * 60); // 분 단위로 계산

                // 60분 이내로 시작하는 이벤트이면서 알림이 아직 보내지 않은 경우
                if (leftTime > 0 && leftTime <= 60 && !notifiedEvents.has(event.id)) {
                    const channel = client.channels.cache.get(notificationChannelId);
                    if (channel && channel.isTextBased()) {
                        channel.send(`⌛ **${event.name}** 이벤트가 60분 후에 시작됩니다!\n🕒 시작 시간: ${startTime.toLocaleString()}\n🔗 [자세히 보기](https://discord.com/events/${guildId}/${event.id})`);
                    }
                    notifiedEvents.add(event.id); // 알림 발송 기록
                }
            });
        } catch (error) {
            console.error('이벤트 확인 중 오류 발생:', error);
        }
    };

    // 이 함수를 10분마다 실행
    cron.schedule('*/10 * * * *', checkEvents);
}

module.exports =  eventAnnounce ;