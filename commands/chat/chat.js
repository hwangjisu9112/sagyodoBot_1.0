// const { SlashCommandBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require('discord.js');
// const { GoogleAuth } = require('google-auth-library');
// const axios = require('axios');
// const path = require('path'); 

// // 서비스 계정 키 JSON 파일 경로
// const SERVICE_ACCOUNT_KEY_FILE = path.join(__dirname, 'sagyodo-discord-bot-3f072e788697.json');

// // GoogleAuth 초기화
// const auth = new GoogleAuth({
//     keyFile: SERVICE_ACCOUNT_KEY_FILE, // JSON 파일 경로 설정
//     scopes: ['https://www.googleapis.com/auth/cloud-platform'],
// });

// module.exports = {
//     data: new SlashCommandBuilder()
//         .setName('chat')
//         .setDescription('구글 제미나이와 대화해보세요'),

//     async execute(interaction) {
//         const modal = new ModalBuilder()
//             .setCustomId('geminiModal')
//             .setTitle('Gemini에게 대화하기');

//         const questionInput = new TextInputBuilder()
//             .setCustomId("question") 
//             .setLabel("❓ 대화 내용(최대 500자)")
//             .setStyle(TextInputStyle.Short)
//             .setRequired(true)
//             .setMinLength(3)
//             .setMaxLength(500);

//         const questionRow = new ActionRowBuilder().addComponents(questionInput);
//         modal.addComponents(questionRow);

//         await interaction.showModal(modal);

//         const submitted = await interaction.awaitModalSubmit({
//             time: 80000,
//             filter: i => i.user.id === interaction.user.id,
//         }).catch(error => {
//             console.error("모달 제출 오류:", error);
//             return null;
//         });

//         if (!submitted) {
//             await interaction.reply({ content: '질문 입력이 취소되었습니다.', ephemeral: true });
//             return;
//         }

//         const questionValue = submitted.fields.getTextInputValue('question');
//         let waitMessage; // try 블록 외부에서 선언

//         try {
//             waitMessage = await interaction.channel.send({ content: 'Gemini 답변 기다리는 중...' });

//             // 인증 토큰 획득
//             const client = await auth.getClient();
//             const projectId = await auth.getProjectId();
//             const token = await client.getAccessToken();

//             const endpoint = `https://asia-east1-aiplatform.googleapis.com/v1/projects/${projectId}/locations/asia-east1/models/gemini-pro:generateContent`; 

//             const geminiResponse = await axios.post(endpoint, {
//                 prompt: {
//                     text: questionValue, // prompt 구조 수정
//                 },
//             }, {
//                 headers: {
//                     'Authorization': `Bearer ${token.token}`, // Bearer 토큰 인증
//                     'Content-Type': 'application/json',
//                 },
//             });

//             const geminiAnswer = geminiResponse?.data?.candidates?.[0]?.content || "Gemini API 응답 오류"; 

//             if (waitMessage) await waitMessage.delete();

//             await interaction.channel.send({
//                 content: `**🌟질문:** ${questionValue}\n**🌟Gemini 답변:** ${geminiAnswer}`,
//             });
//         } catch (error) {
//             console.error("Gemini API 호출 오류:", error);
//             if (waitMessage) await waitMessage.delete();
//             await interaction.channel.send({ content: 'Gemini API 호출 중 오류가 발생했습니다.' });
//         }
//     },
// };