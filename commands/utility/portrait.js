// 사진 명령어. 

const { SlashCommandBuilder } = require('discord.js');

  module.exports = {
	data: new SlashCommandBuilder()
		.setName('사진')
		.setDescription('명령어 입력자의 디스코드 프로필 사진을 출력합니다'),
        
	async execute(interaction) {

        // 명령어 입력자
        const user = interaction.user;

        const avatarURL = user.displayAvatarURL({ dynamic: true }); // dynamic: true 옵션을 사용하여 최신 버전의 프로필 사진을 가져옵니다.

        console.log("누구인가? " + user.username)
        // 명령어 입력자의 초상화를 출력
        await interaction.reply({ content: avatarURL });
	},
};