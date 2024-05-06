const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('날짜')
		.setDescription('날짜'),
	async execute(interaction) {

        const today = new Date(); 
        const month = today.getMonth() + 1; 
        const date = today.getDate(); 
        const dayIndex = today.getDay(); 
        const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];
        const day = daysOfWeek[dayIndex]; 

		await interaction.reply(`🗓️ 오늘은 **${month}월 ${date}일 ${day}요일** 입니다`);
	},
};