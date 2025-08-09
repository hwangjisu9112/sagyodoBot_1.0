// 타이머 명령어 

const { SlashCommandBuilder } = require('discord.js');

  module.exports = {
	data: new SlashCommandBuilder()
		.setName('타이머')
		.setDescription('분 단위로 타이머를 지정하여, 지정된 시간이 되면 채팅으로 알려줍니다')
        .addIntegerOption(option =>
            option
                .setName('min')
                .setDescription('타이머 시간을 입력하세요 (최소 1분, 최대 60분)')
                .setRequired(true)
                .setMinValue(1)
                .setMaxValue(60)),
        
	async execute(interaction) {

        const minutes = interaction.options.getInteger('min');
        const setTime = minutes * 1000 * 60;

        await interaction.reply({
            content: `${minutes} 분 후에 알려드립니다`,
            ephemeral: false
    });
     // setTimeout으로 지정된 시간 후에 알림 전송
     setTimeout(async () => {
        try {
          await interaction.followUp({
            content: `🔔 ${interaction.user}님, ${minutes}분이 지났어요!`,
            ephemeral: false //  채널에 공개되도록 설정
          });
        } catch (error) {
          console.error('타이머 알림 실패:', error);
        }
      }, setTime);
    }
  };