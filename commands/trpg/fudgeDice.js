 /** 
* 6면체 주사위이되 숫자 대신 +, -, 공백으로만 이루어진 퍼지 주사위를 던진다
* 여러 개의 퍼지 주사위를 던져 나온 +의 수만큼 +1, 공백의 수만큼 +0, -의 수만큼 -1을 더한다
* 4개의 퍼지 주사위를 던져 +, +, -, 공백이라는 결과가 나왔다면 1+1-1+0 = 1이라는 값으로 표현한다
*/

const { SlashCommandBuilder } = require('discord.js');


/**
 * SlashCommandBuilder를 정의.
 *
 * @description -, +, 0이라는 값만 존재하는 퍼지 주사위라는 결과를 작성하는 명령어.
 */
module.exports = {
	data: new SlashCommandBuilder()
		.setName('퍼지')
		.setDescription('퍼지 주사위를 던집니다. 최대 10개까지 굴릴 수 있습니다')
        .addIntegerOption(option =>
            option
                .setName('횟수')
                .setDescription('주사위 던지는 횟수를 입력하세요 (최소 1, 최대10)')
                .setRequired(true)
                .setMinValue(1)
                .setMaxValue(10)),


	async execute(interaction) {

        const times = interaction.options.getInteger('횟수'); // 던지는 횟수 정수로 가져오기
        
        console.log("퍼지 주사위 실시 "); 
        console.log("times => " +   times)

  
          if (times < 1 || times > 10) {
            return interaction.reply({ content: '🫠 던지는 횟수는 1~10까지 입력 가능합니다.' });
        }
  
     
  
          // 여러 개의 퍼지 주사위를 던져서 결과를 계산
          let totalValue = 0;
          let resultValue = '';
          let resultMark = '';
  
          // 퍼지 주사위.
          for (let i = 0; i < times; i++) {
              const fudgeDie = rollDice();
              let fudgeValue = '';
              let fudgeMark = '';
              if (fudgeDie === 1) {
                  fudgeValue = '+1';
                  fudgeMark = '[+]';
                  totalValue += 1;
              } else if (fudgeDie === 2) {
                  fudgeValue = '-1';
                  fudgeMark = '[-]';
                  totalValue -= 1;
              } else if (fudgeDie === 3) {
                  fudgeValue = '0';
                  fudgeMark = '[ ]';
              }
              // 결과를 문자열로 추가.
              resultValue += fudgeValue;
              resultMark += fudgeMark;
  
              if (i !== times - 1) {
                  resultValue += ', ';
              }
          }
  
          // 결과를 메시지로 출력

		await interaction.reply(`>>> 🍫 : ${resultMark}\n ${resultValue}\n 결과 :  ${totalValue} `);
	},
};

// 퍼지 주사위를 던지는 함수
function rollDice() {
    return Math.floor(Math.random() * 3) + 1;
}