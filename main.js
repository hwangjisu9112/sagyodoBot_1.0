// 사교도 봇 1.0을 가동하는 메인 파일이다 node main.js

/**
 * @typedef {import('discord.js').Client} Client   Importerer 클라이언트 클래스
 * @typedef {import('discord.js').Events} Events 이벤트 클래스
 * @typedef {import('discord.js').GatewayIntentBits} GatewayIntentBits 게이트웨이 의도 비트 클래스
 * @typedef {import('discord.js').Collection} Collection 컬렉션 클래스
 */


const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');

const fs = require('node:fs');
const path = require('node:path');


const { TOKEN } = require('./config.json');

/**
 * 새로운 클라이언트 인스턴스 생성
 * @type {Client}
 */
const client = new Client({ intents: [GatewayIntentBits.Guilds] });


/**
 * 커맨드 컬렉션 생성
 * @type {Collection<string, import('./commands')>}
 */
client.commands = new Collection();


/**
 * 커맨드 폴더 경로
 * @type {string}
 */
const foldersPath = path.join(__dirname, 'commands');

/**
 * 커맨드 폴더 목록 얻기
 * @type {string[]}
 */
const commandFolders = fs.readdirSync(foldersPath);

/**
 * 모든 커맨드 파일 로드 및 등록
 */
for (const folder of commandFolders) {

	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

	console.log("commandsPath -> " + commandsPath)
	console.log("commandFiles -> " + commandFiles)
	/**
   * 모든 커맨드 파일 순환 처리
   */
	for (const file of commandFiles) {

		const filePath = path.join(commandsPath, file);
		const command = require(filePath);

		//console.log("filePath -> " + filePath)
		//console.log("command -> " + command)


		/**
	   * 커맨드 이름으로 커맨드 컬렉션에 등록
	   * @param {string} command.data.name 커맨드 데이터의 이름 속성
	   * @param {import('./commands')} command 로드된 커맨드 모듈
	   */
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
			console.log("command.data.name -> " + command.data.name)

		} else {
			console.log(`[WARNING] 커맨드 :  ${filePath}의 명령에 필수 "데이터" 또는 "실행" 속성이 없습니다`);
		}
	}
}

/**
 * 클라이언트가 준비되면 이 코드를 한 번만 실행, 실행된 봇의 명칭 + 개발한 디스코드 버전
 * (이벤트 리스너 등록)
 * @param {Client<true>} readyClient 준비된 클라이언트 객체
 */

client.once(Events.ClientReady, readyClient => {


	console.log(`${readyClient.user.tag}가 깨어났다`);
	console.log(`discord.js 버전  -> ` + require('discord.js').version);
});


client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`${interaction.commandName}을 찾을 수 없습니다`);
		return;
	}

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: '🍨 명령어 실행 중 에러가 발생했습니다', ephemeral: true });
		} else {
			await interaction.reply({ content: '🍨 명령어 실행 중 에러가 발생했습니다', ephemeral: true });
		}
	}
});


/**
 * 클라이언트 토큰으로 디스코드에 로그인합니다.
 * @param {string} TOKEN 개인 토큰 (config.json 파일에 저장)
 * @returns {Promise<string>} 로그인 성공 시 프로미스 해결
 */
client.login(TOKEN);
