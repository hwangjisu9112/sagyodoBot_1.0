const { SlashCommandBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require('discord.js');

/**
 * SlashCommandBuilder를 정의.
 *
 * @description 구인글 템플릿을 만들어줍니다
 */
module.exports = {
	data: new SlashCommandBuilder()
		.setName('구인')
		.setDescription('구인글 템플릿을 만들어줍니다'),

	async execute(interaction) {
		const modal = new ModalBuilder()
			.setCustomId('appointment')
			.setTitle('TRPG 구인');

		// 제목 입력 텍스트 박스
		const title = new TextInputBuilder()
			.setCustomId("title")
			.setLabel("💡 세션 제목(최대 100자)")
			.setStyle(TextInputStyle.Short)
			.setRequired(true)
			.setMinLength(2)
			.setMaxLength(100);

		// 개요 입력 텍스트 박스
		const outline = new TextInputBuilder()
			.setCustomId("outline")
			.setLabel("🎞️ 개요(최대 1000자)")
			.setStyle(TextInputStyle.Paragraph)
			.setRequired(true)
			.setMinLength(2)
			.setMaxLength(1000);

		// 인원 입력 텍스트 박스
		const participants = new TextInputBuilder()
			.setCustomId("participants")
			.setLabel("🎲  참가자 수")
			.setStyle(TextInputStyle.Short)
			.setRequired(true)
			.setMinLength(1)
			.setMaxLength(3);

		// 예상 시간 입력 텍스트 박스
		const duration = new TextInputBuilder()
			.setCustomId("duration")
			.setLabel("⏱ 예상 소요 시간")
			.setStyle(TextInputStyle.Short)
			.setRequired(true)
			.setMinLength(1)
			.setMaxLength(20);

		// 시작 시간 입력 텍스트 박스
		const startTime = new TextInputBuilder()
			.setCustomId("startTime")
			.setLabel("🗓️ 플레이 일시")
			.setStyle(TextInputStyle.Short)
			.setRequired(true)
			.setMaxLength(20);


		// 텍스트 박스들을 행으로 그룹화
		const titleRow = new ActionRowBuilder().addComponents(title);
		const outlineRow = new ActionRowBuilder().addComponents(outline);
		const participantsRow = new ActionRowBuilder().addComponents(participants);
		const durationRow = new ActionRowBuilder().addComponents(duration);
		const startTimeRow = new ActionRowBuilder().addComponents(startTime);

		// 모달에 텍스트 박스 행 추가
		modal.addComponents(titleRow, outlineRow, participantsRow, durationRow, startTimeRow);

		// 모달 표시
		await interaction.showModal(modal);

		// 모달 제출 처리 (discord.js v14 이상)
		const submitted = await interaction.awaitModalSubmit({
			time: 80000,
			filter: i => i.user.id === interaction.user.id,
		}).catch(error => {
			console.error(error);
			return null;
		});

		if (!submitted) {
			console.log('모달 입력이 캔슬됐습니다');
			return;
		}


		const titleValue = submitted.fields.getTextInputValue('title');
		const outlineValue = submitted.fields.getTextInputValue('outline');
		const participantsValue = submitted.fields.getTextInputValue('participants');
		const durationValue = submitted.fields.getTextInputValue('duration');
		const startTimeValue = submitted.fields.getTextInputValue('startTime');

		const notice =` \n\ **${titleValue}** \n\n 🎞️  개요 \n ${outlineValue}  \n\n🎲 모집 인원:  ${participantsValue} \n\n⏰ 플레이 타임:  ${durationValue} \n\n🗓️  플레이 일시: ${startTimeValue} \n\n <<플레이를 원하는 분은 이 게시물에 이모지를 남겨주세요>>`
		


		/**
 		* 사용자가 입력한 정보를 포함한 메시지를 보냅니다. 
 		*/
		await submitted.reply({
			content: notice,
			mentions: { everyone: true },
		});
	},
};