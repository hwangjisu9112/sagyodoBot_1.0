const { SlashCommandBuilder, ButtonBuilder, ActionRowBuilder, InteractionType } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('가위바위보')
    .setDescription('사교도와 가위바위보를 합니다'),

  async execute(interaction) {
    // Button Creation
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

    const row = new ActionRowBuilder()
      .addComponents(scissorsButton, rockButton, paperButton);

    // Reply Message with Buttons
    const message = await interaction.reply({ content: '무엇을 내시겠습니까?', components: [row] });

    try {
      // Await Interaction Response (Button Click)
      const filter = (i) => i.type === InteractionType.MessageComponent && i.user.id === interaction.user.id;
      const buttonInteraction = await message.awaitMessageComponent({ filter });

      const userChoice = buttonInteraction.customId;
      const botChoice = getBotChoice();
      const winner = determineWinner(userChoice, botChoice);

      const replyMessage = `**${interaction.user.username}**님은 **${userChoice}**를 선택하셨습니다. \n**사교도**는 **${botChoice}**를 선택했습니다.\n\n 결과: **${winner}**`;

      await buttonInteraction.update({ content: replyMessage, components: [] });

    } catch (error) {
      if (error.code === 'InteractionCollectorError') {
        await message.edit({ content: '⏳ 시간이 지나 버튼 입력이 취소되었습니다 15초.' });
      } else {
        console.error('에러 발생:', error);
      }
    }
  },
};

// Function to generate bot's choice randomly
function getBotChoice() {
  const options = ['Scissors', 'Rock', 'Paper'];
  return options[Math.floor(Math.random() * options.length)];
}

function determineWinner(userChoice, botChoice) {
  if (userChoice === botChoice) return '비김';

  switch (userChoice) {
    case 'Scissors':
      return botChoice === 'Paper' ? '이겼다!' : 'LOSE';
    case 'Rock':
      return botChoice === 'Scissors' ? '이겼다!' : 'LOSE';
    case 'Paper':
      return botChoice === 'Rock' ? '이겼다!' : 'LOSE';
  }
}