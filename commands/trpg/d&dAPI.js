/* https://www.dnd5eapi.co
*  D&D 5e SRD API,던전 앤 드래곤 관련 API를 이용하여 게임 내의 주문, 몬스터, 아이템 등에 대한 정보를 출력한다
*/
const { SlashCommandBuilder } = require('discord.js');
const fetch = require('node-fetch');

// import fetch from 'node-fetch'; node fetch 3버전을 사용하기 위해서는 좌측 문법을 사용... 

module.exports = {
  data: new SlashCommandBuilder()
    .setName('dd')
    .setDescription('던전 앤 드래곤 5e SRD API로부터 정보를 출력합니다. 영어로 되어 있습니다 ㅠㅠ')
    .addStringOption(option =>
      option.setName('카테고리')
        .setDescription('API의 카테고리에 해당하는 부분을 출력합니다')
        .setRequired(true)
        .addChoices([ // 'addChoices'에 객체 배열 직접 입력
          { name: '클래스', value: 'classes' },
       // { name: '룰', value: 'rule-sections' },
          { name: '마법 학파', value: 'magic-schools' },
          { name: '무기 분류', value: 'weapon-properties' },
          { name: '기술', value: 'skills' },
       // { name: '몬스터', value: 'monsters' },
          { name: '서브 종족', value: 'subraces' },
          { name: '서브 클래스', value: 'subclasses' },
          { name: '성향', value: 'alignments' },
          { name: '어빌리티', value: 'ability-scores' },
          { name: '언어', value: 'languages' },
        //{ name: '주문', value: 'spells' },
          { name: '종족', value: 'races' }
        ])
        .setRequired(true)
    ),

  async execute(interaction) {
    const selectedCategory = interaction.options.getString('카테고리'); // 선택된 옵션 값 가져오기
    const endpoint = `https://www.dnd5eapi.co/api/${selectedCategory}`; // 엔드포인트 생성

    console.log('Endpoint:', endpoint);
    console.log('selectedCategory:', selectedCategory);

    try {

      /**
      * API 호출 및 응답 객체
      *
      * @type {Response}
      */
      const response = await fetch(endpoint);

      /**
   * JSON 형식으로 변환된 응답 데이터
   *
   * @type {Object}
   */
      const jsonString = await response.json();


      /**
     * 중괄호, 대괄호, 쌍따옴표, 쉼표 제거된 문자열
     *
     * @type {String}
     */
      let formatted = JSON.stringify(jsonString, null, 2)
        .replace(/(\{|\}|\[|\]|"|,)/g, ``);

      console.log("formatted -> ", formatted);
      console.log("formatted 길이 -> ", formatted.length);


      /**
     * API 호출 성공 여부 판단
     */
      if (response.ok) {
        // formatted 문자열이 1800 이상인지 확인하여 분할 출력
        if (formatted.length >= 1800) {

          /**
        * 1500 단위로 문자열 분할된 배열
        *
        * @type {Array<String>}
        */
          let chunks = formatted.match(/[\s\S]{1,1800}/g); // 1800 단위로 데이터를 나눔
          for (let chunk of chunks) {
            await interaction.reply(`📜 **${selectedCategory} 데이터**\n\`\`\`내용\n${chunk}\n\`\`\``);
          }
        } else {
          // 1800 이하면 한 번에 출력
          interaction.reply(`📜 **${selectedCategory} 데이터**\n\`\`\`내용\n${formatted}\n\`\`\``);
        }
      } else {
        // API 호출 실패 시, 에러 메시지 출력
        interaction.reply(`🫤 API 데이터를 가져오는 중에 오류가 발생했습니다. 항목명이 바르지 않거나, API 데이터에 변동이 생겼을 수 있습니다 ${response.status}`);
      }
    } catch (error) {
      // 예상치 못한 오류 발생 시, 에러 메시지 출력
      interaction.reply(`🫤 API 데이터를 가져오는 중에 오류가 발생했습니다. 항목명이 바르지 않거나, API 데이터에 변동이 생겼을 수 있습니다 ${error.message}`);
    }
  }
};