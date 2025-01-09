// const { SlashCommandBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require('discord.js');
// const { CommandInteraction } = require('discord.js');

// module.exports = {
//     data: new SlashCommandBuilder()
//         .setName('라이어')
//         .setDescription('라이어 게임을 시작합니다 (최소 3명 이상)')
//         .addOption(option =>
//             option.setName('참가자수')
//                 .setDescription('참가자 수를 입력하세요 (최소 3명 이상)')
//                 .setType(OptionType.Integer)
//                 .setRequired(true)
//                 .setMinValue(3)),


//     async execute(interaction) {
//         // 게임 객체 생성
//         const liarGame = new LiarGame();

//         // 게임 진행 채널 설정
//         liarGame.messageChannel = interaction.channel;

//         // 모달 생성 및 전송
//         const modal = new ModalBuilder()
//             .setCustomId('liarGameModal')
//             .setTitle('라이어 게임 참가')


//         // 닉네임 입력 텍스트 박스 추가 (최소 3개)
//         for (let i = 0; i < 3; i++) {
//             const nameInput = new TextInputBuilder()
//                 .setCustomId(`nameInput${i + 1}`)
//                 .setLabel(`참가자 ${i + 1} 닉네임`)
//                 .setStyle(TextInputStyle.Short)
//                 .setRequired(true);
//             modal.addComponents(new ActionRowBuilder().addComponents(nameInput));
//         }

//         await interaction.showModal(modal);
//     },
// };


// class LiarGame {
//     constructor() {
//         // 게임 정보 저장 변수
//         this.players = []; // 참가자 정보 (닉네임, 키워드)
//         this.messageChannel = null; // 게임 진행 채널
//     }

//     // 게임 시작 기능
//     async start() {
//         // 모달 생성
//         const modal = new Modal({ title: '라이어 게임 참가' });

//         // 닉네임 입력 텍스트 박스 추가 (최소 3개)
//         for (let i = 0; i < 3; i++) {
//             const nameInput = new TextInputComponent({
//                 customId: `nameInput${i + 1}`,
//                 label: `참가자 ${i + 1} 닉네임`,
//                 style: 'SHORT',
//                 required: true,
//             });
//             modal.addComponents(new ActionRow({ components: [nameInput] }));
//         }

//         // 모달 전송 및 응답 처리
//         const interaction = await modal.showModal(this.messageChannel);
//         if (!interaction.isModalSubmit()) return;

//         // 입력된 닉네임 추출
//         const playerNicknames = interaction.components.map((component) => {
//             if (component.type === 'TEXT_INPUT') return component.value;
//             return null;
//         }).filter((name) => name !== null);

//         // 닉네임 유효성 검사
//         if (playerNicknames.length < 3) {
//             await interaction.reply({ content: '최소 3명 이상 참여해야 합니다!', ephemeral: true });
//             return;
//         }

//         // 실제 서버 닉네임 확인 및 예외 처리
//         const guild = interaction.guild;
//         const validPlayers = [];
//         for (const nickname of playerNicknames) {
//             const member = guild.members.cache.find((member) => member.displayName === nickname);
//             if (!member) {
//                 await interaction.reply({ content: `${nickname}은 존재하지 않는 닉네임입니다!`, ephemeral: true });
//                 return;
//             }
//             validPlayers.push({ nickname, keyword: null });
//         }

//         // 게임 정보 저장 및 메시지 전송
//         this.players = validPlayers;
//         this.messageChannel = interaction.channel;
//         await this.sendGameStartMessages();
//     }

//     // 게임 시작 메시지 전송
//     async sendGameStartMessages() {
//         // 라이어 선정
//         const liarIndex = Math.floor(Math.random() * this.players.length);
//         const liar = this.players[liarIndex];
//         liar.keyword = '라이어';

//         // 메시지 전송
//         for (let i = 0; i < this.players.length; i++) {
//             const player = this.players[i];
//             const message = player.nickname === liar.nickname ? '당신은 라이어입니다!' : `키워드: ${player.keyword}`;
//             await player.send({ content: message });
//         }
//     }
// }