// 서버에 사교도 봇 1.0의 커맨드를 등록 및 새로고침하는 파일이다 node deploy.js


/**
 * @typedef {import('discord.js').REST} REST
 * 디스코드.js REST 클래스
 * 
 * @typedef {import('discord.js').Routes} Routes
 * 디스코드.js Routes 클래스
 */
const { REST, Routes } = require('discord.js');
const { CLIENT_ID, GUILD_ID, TOKEN } = require('./config.json');


const fs = require('node:fs');
const path = require('node:path');

/**
 * 커맨드 배열입니다.
 * 각 커맨드는 SlashCommandBuilder 객체의 toJSON() 메서드를 호출한다
 * @type {Array<Object>}
 */
const commands = [];

// 커맨드 폴더 경로, commands 하위에 있는 파일을 검색하는 데 사용
const foldersPath = path.join(__dirname, 'commands');

/**
 * 커맨드 폴더 목록을 가져온다
 * @type {string[]}
 */
const commandFolders = fs.readdirSync(foldersPath);


/**
 * 모든 커맨드 폴더를 반복하면서 .js로 끝나는 파일 안에 있는 명령어를 등록한다
 * @param {string} folder 커맨드 폴더명
 */
for (const folder of commandFolders) {

    const commandsPath = path.join(foldersPath, folder);
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);
        if ('data' in command && 'execute' in command) {
            commands.push(command.data.toJSON());
        } else {
            console.log(`[WARNING] 커맨드 : ${filePath}의 명령에 필수 "데이터" 또는 "실행" 속성이 없습니다`);
        }
    }
}

/**
 * REST 인스턴스를 생성하고 토큰을 설정한다.
 * @type {REST}
 */
const rest = new REST().setToken(TOKEN);


(async () => {
    try {
        console.log(`${commands.length} application (/)`);

   /**
     * PUT 메서드를 사용하여 길드에 모든 커맨드를 새로고침한다
     * 
     * @param {string} route REST API 엔드포인트 경로 (applicationGuildCommands)
     * @param {Object} options 옵션 객체
     * @property {Array<Object>} options.body 배포할 커맨드 데이터 배열
     * 
     * @returns {Promise<Array<Object>>} 새로고침된 커맨드 데이터 배열
     */		const data = await rest.put(
            Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
            { body: commands },
        );

        console.log(`${data.length} 개의 명령어가 등록됐다`);
    } catch (error) {
        console.error(error);
    }
})();