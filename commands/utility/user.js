const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('user')
		.setDescription('유저에 대한 정보'),
	async execute(interaction) {
		// interaction.user is the object representing the User who ran the command
		// interaction.member is the GuildMember object, which represents the user in the specific guild
		await interaction.reply(`당신의 유저명 :  ${interaction.user.username}, 가입 일시 : ${interaction.member.joinedAt}.`);
	},
};