const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

/**
 * SlashCommandBuilder를 정의.
 *
 * @description 코코포리아에서 크툴루의 부름을 하는 법에 대한 약식 설명
 */
module.exports = {
    data: new SlashCommandBuilder()
        .setName('코코')
        .setDescription('코코포리아에서 크툴루의 부름을 하는 법에 대한 약식 설명'),

    /**
* Slash Command 실행 시 처리하는 함수입니다.
*
* @param {ChatInputCommandInteraction} interaction 상호 작용 객체
*/
    async execute(interaction) {

        // 코코포리아 사용법을 설명하는 임베드 메시지 생성
        interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setTitle(`코코포리아`)
                    .setColor('#00FF7F')
                    .setDescription(`☕ [코코포리아 사용법 정리 노션 문서](https://lacy-goldfish-e44.notion.site/4e867f269cc94f87b4fa728ed3fc0810)`)

            ],
        });
    },
};
