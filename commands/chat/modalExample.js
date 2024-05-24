// const { SlashCommandBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require('discord.js');

// const { CommandInteraction } = require("discord.js");

// //const { Configuration, OpenAIApi } = require('openai');


// module.exports = {
// 	data: new SlashCommandBuilder()
// 		.setName('교도야')
// 		.setDescription('우선 모달 하나를 출력해보자'),

// 	async execute(interaction) {
// 		const modal = new ModalBuilder()
// 			.setCustomId('test for mordal')
// 			.setTitle('question Modal');

// 		const question = new TextInputBuilder()
// 			.setCustomId("question")
// 			.setLabel("입력하고 싶은 텍스트(최대 200자)")
// 			.setStyle(TextInputStyle.Short)
// 			.setRequired(true)
// 			.setMinLength(2)
// 			.setMaxLength(200);

// 		modal.addComponents(
// 			new ActionRowBuilder().addComponents(question),
// 		);



// 		interaction.showModal(modal);

// 		return;
// 	},
// };