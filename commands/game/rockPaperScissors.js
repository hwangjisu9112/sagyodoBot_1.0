const { SlashCommandBuilder, ButtonBuilder, ActionRowBuilder, InteractionType } = require('discord.js');


/**
 * SlashCommandBuilder를 정의.
 *
 * @description 사용자와 사교도가 가위바위보를 하는 명령어.
 */
module.exports = {
  data: new SlashCommandBuilder()
    .setName('가위바위보')
    .setDescription('사교도와 가위바위보를 합니다'),

  /**
   * 명령어 실행 시 호출되는 비동기 함수.
   *
   * @param {Interaction} interaction - 명령어 상호 작용 객체
   */
  async execute(interaction) {
    
    // ButtonBuilder로 유저가 선택할 수 있는 가위, 바위, 보를 버튼으로 작성
    const scissorsButton = new ButtonBuilder()
      .setCustomId('Scissors')
      .setLabel('✂️ 가위')
      .setStyle(3);

    const rockButton = new ButtonBuilder()
      .setCustomId('Rock')
      .setLabel('🪨 바위')
      .setStyle(3);

    const paperButton = new ButtonBuilder()
      .setCustomId('Paper')
      .setLabel('✋ 보')
      .setStyle(3);


    // 버튼 행 생성
    const row = new ActionRowBuilder()
      .addComponents(scissorsButton, rockButton, paperButton);

    // 버튼이 포함된 메시지를 답변으로 보냄
    const message = await interaction.reply({ content: '무엇을 내시겠습니까?', components: [row] });

    try {
      // 버튼 클릭 응답 기다림 (15초 제한)
      const filter = (i) => i.type === InteractionType.MessageComponent && i.user.id === interaction.user.id;
      const buttonInteraction = await message.awaitMessageComponent({ filter });

      // 사용자 선택 추출
      const userChoice = buttonInteraction.customId;
      
      // 봇 선택 추출
      const botChoice = getBotChoice();
            
      // 승부 결정
      const winner = determineWinner(userChoice, botChoice);

      // 결과 메시지 생성
      const replyMessage = `**${interaction.user.username}**님은 **${userChoice}**를 선택하셨습니다. \n**사교도**는 **${botChoice}**를 선택했습니다.\n\n 결과: **${winner}**`;

      // 버튼 상호 작용 메시지 업데이트
      await buttonInteraction.update({ content: replyMessage, components: [] });

    } catch (error) {
      // 시간 초과 시 메시지 수정
      if (error.code === 'InteractionCollectorError') {
        await message.edit({ content: '⏳ 시간이 지나 버튼 입력이 취소되었습니다 15초.' });
      } else {
        // 기타 에러 발생 시 콘솔에 출력
        console.error('에러 발생:', error);
      }
    }
  },
};

/**
 * 봇 선택을 무작위로 생성하는 함수.
 *
 * @returns {string} "가위", "바위", "보"의 배열 중 하나를 무작위로 선택하여 반환.
 */
function getBotChoice() {
  const options = ['Scissors', 'Rock', 'Paper'];
  return options[Math.floor(Math.random() * options.length)];
}


/**
 * 사용자 선택과 봇 선택에 따라 승부를 결정하는 함수.
 *
 * @param {string} userChoice - 사용자 선택 ("가위", "바위", "보")
 * @param {string} botChoice - 봇 선택 ("가위", "바위", "보")
 * @returns {string} "이겼다!", "졌다...", "비김" 중 하나를 반환.
 */
function determineWinner(userChoice, botChoice) {
  if (userChoice === botChoice) return '비김';

  switch (userChoice) {
    case 'Scissors':
      return botChoice === 'Paper' ? '이겼다!' : '졌다...';
    case 'Rock':
      return botChoice === 'Scissors' ? '이겼다!' : '졌다...';
    case 'Paper':
      return botChoice === 'Rock' ? '이겼다!' : '졌다...';
  }
}