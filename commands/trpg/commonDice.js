const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('주사위')
        .setDescription('기본적인 주사위를 던진 값을 출력합니다')
        .addIntegerOption(option =>
            option
                .setName('횟수')
                .setDescription('주사위 던지는 횟수를 입력하세요 (최소 1, 최대10)')
                .setRequired(true)
                .setMinValue(1)
                .setMaxValue(10))
        .addIntegerOption(option =>
            option
                .setName('종류')
                .setDescription('던지는 주사위의 면의 수')
                .setMinValue(1)
                .setMaxValue(100)
        ),

    async execute(interaction) {
        const diceType = interaction.options.getInteger('종류') // 
        const times = interaction.options.getInteger('횟수'); // 던지는 횟수 정수로 가져오기

        console.log("diceType => " +  diceType)
        console.log("times => " +   times)

        // 옵션 유효성 검사

        if (times < 1 || times > 10) {
            return interaction.reply({ content: '🫠 던지는 횟수는 1~10까지 입력 가능합니다.' });
        }

        if (!diceType || diceType < 1  || diceType > 100) {
            return interaction.reply({ content: '🫠 주사위 종류를 선택해주세요. 주사위의 종류는 1 이상인 자연수만 허용합니다' });
        }

        // 주사위 던지기 및 결과 출력
        const results = [];
        let total = 0;
        let diceValue = 0;

        for (let i = 0; i < times; i++) {

            diceValue = Math.floor(Math.random() * diceType) + 1;


            total += diceValue;
            results.push(diceValue);
        }

        const formattedResults = results.join(', ');

        console.log("diceValue => " + diceValue)
        console.log("total => " + total)
        console.log("formattedResults => " + formattedResults)

        await interaction.reply({ content: `>>> 🥠 [${formattedResults} ] \n 결과 : ${total} ` });
        
    },
};