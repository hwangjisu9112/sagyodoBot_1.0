const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('server')
		.setDescription('서버에 대한 간략한 정보'),
	async execute(interaction) {


		await interaction.reply(`서버명 :  ${interaction.guild.name}, 총 인원 수 : ${interaction.guild.memberCount}.`);
	},
};