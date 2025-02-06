const cron = require('node-cron');

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

                const channel = client.channels.cache.get(notificationChannelId);
                if (!channel || !channel.isTextBased()) return;

                // 24시간 전에 알림 (1회)
                if (leftTime > 1380 && leftTime <= 1440 && !notifiedEvents.has(`${event.id}_24h`)) {
                    channel.send(`⏳ **${event.name}** 이벤트가 24시간 후에 시작됩니다!\n🕒 시작 시간: ${startTime.toLocaleString()}\n🔗 [자세히 보기](https://discord.com/events/${guildId}/${event.id})`);
                    notifiedEvents.add(`${event.id}_24h`);
                }

                // 60분 전에 알림 (1회)
                if (leftTime > 0 && leftTime <= 60 && !notifiedEvents.has(`${event.id}_60m`)) {
                    channel.send(`⌛ **${event.name}** 이벤트가 60분 후에 시작됩니다!\n🕒 시작 시간: ${startTime.toLocaleString()}\n🔗 [자세히 보기](https://discord.com/events/${guildId}/${event.id})`);
                    notifiedEvents.add(`${event.id}_60m`);
                }
            });
        } catch (error) {
            console.error('이벤트 확인 중 오류 발생:', error);
        }
    };

    // 30분마다 실행
    cron.schedule('*/30 * * * *', checkEvents);
}

module.exports = eventAnnounce;
