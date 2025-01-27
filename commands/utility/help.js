const { ActionRowBuilder, SlashCommandBuilder, ButtonBuilder, EmbedBuilder } = require('discord.js');
const { general, trpg, game ,all } = require("./help.json");


/**
 * SlashCommandBuilder를 정의.
 *
 * @description 사교도 명령어 모음을 출력 하는 명령어.
 */
module.exports = {
  data: new SlashCommandBuilder()
    .setName('도움')
    .setDescription('명령어 모음을 출력합니다'),

  /**
   * 명령어 실행 시 호출되는 비동기 함수.
   *
   * @param {Interaction} interaction - 명령어 상호 작용 객체
   */
  async execute(interaction) {

    // ButtonBuilder로 유저가 선택할 수 있는 명령어 카테고리를 버튼으로 작성
    const generalButton = new ButtonBuilder()
      .setCustomId('general')
      .setLabel('일반')
      .setStyle(1);

    const trpgButton = new ButtonBuilder()
      .setCustomId('trpg')
      .setLabel('TPRG')
      .setStyle(1);

    const gameButton = new ButtonBuilder()
      .setCustomId('game')
      .setLabel('놀이')
      .setStyle(1);


    const allButton = new ButtonBuilder()
      .setCustomId('all')
      .setLabel('전체')
      .setStyle(1);

    const row = new ActionRowBuilder()
      .addComponents(generalButton, trpgButton, gameButton, allButton);


    // 답변 메시지 전송
    await interaction.reply({ content: "🧭 도움말 목록", components: [row] });

    console.log(row);

    // 버튼 클릭 이벤트 리스너 등록
    const collector = interaction.channel.createMessageComponentCollector({
      filter: (component) => component.customId === 'general' || component.customId === 'game' || component.customId === 'trpg' || component.customId === 'all',
      time: 15000 // 버튼 클릭 대기 시간 (15초)
    });
    
    collector.on('collect', async (component) => {

      try {

        // 임베드 객체 생성
        const embed = new EmbedBuilder();

        //유저가 버튼을 선택하면 그에 대응하는 임베드를 출력한다. 임베드의 내용물은 help.json파일에서 가져온다
        switch (component.customId) {
          case 'general':
            embed
              .setTitle('일반 명령어')
              .setColor('#DAA520')
              .setDescription(getGeneralCommandDescriptions());

            break;
          case 'trpg':
            embed
              .setTitle('TPRG 명령어')
              .setColor('#DAA520')
              .setDescription(getTRPGCommandDescriptions());

            break;

          case 'game':
            embed
              .setTitle('놀이 명령어')
              .setColor('#DAA520')
              .setDescription(getGameCommandDescriptions());

            break;

          case 'all':
            embed
              .setTitle('전체 명령어')
              .setColor('#DAA520')
              .setDescription(geAllCommandDescriptions());


            break;
        }

        await interaction.editReply({ embeds: [embed], components: [] });
      } catch (error) {
        console.error(' 답변 상에 에러가 발생함:', error);
        await interaction.editReply({ content: '🤔 에러 발생!' });
      }
    });
  },
};

//help.json으로부터 각각의 generalCommands 불러오며, 줄바꿈으로 구별
function getGeneralCommandDescriptions() {
  return Object.values(general).join('\n');
}

//help.json으로부터 각각의 trpgCommands 불러오며, 줄바꿈으로 구별
function getTRPGCommandDescriptions() {
  return Object.values(trpg).join('\n');
}

//help.json으로부터 각각의 gameCommands 불러오며, 줄바꿈으로 구별
function getGameCommandDescriptions() {
  return Object.values(game).join('\n');
}

//help.json으로부터 각각의 generalCommands 불러오며, 줄바꿈으로 구별
function geAllCommandDescriptions() {
  return Object.values(all).join('\n');
}