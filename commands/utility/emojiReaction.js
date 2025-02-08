// 감정표현 명령어. 

const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('안아줘요')
		.setDescription('유저의 명령어에 이모지를 다는 리액션을 해줍니다'),

	async execute(interaction) {
    
    await interaction.reply({ content: '안아줬어요!' });

		// 메시지를 가져와서 반응 추가
		const message = await interaction.fetchReply();
		await message.react('🫂');
	},
};