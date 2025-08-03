// 타이머 명령어 

const { SlashCommandBuilder } = require('discord.js');

  module.exports = {
	data: new SlashCommandBuilder()
		.setName('타이머')
		.setDescription('분 단위로 타이머를 지정하여, 지정된 시간이 되면 채팅으로 알려줍니다')
        .addIntegerOption(option =>
            option
                .setName('분 후')
                .setDescription('타이머 시간을 입력하세요 (최소 1분, 최대 60분)')
                .setRequired(true)
                .setMinValue(1)
                .setMaxValue(60)),
        
	async execute(interaction) {
｝
        const minutes = interaction.options.getInteger("분");
        const minutesX1000 = minutes * 1000;

        await interaction.reply({
            content: `${minutes} 분 후에 알려드립니다`
            ephemeral: false
            88888888888888888888888888888888888
        })
        }
	},
};