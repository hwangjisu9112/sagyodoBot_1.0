// 사교도 봇 1.0을 가동하는 메인 파일이다 node main.js

/**
 * @typedef {import('discord.js').Client} Client   Importerer 클라이언트 클래스
 * @typedef {import('discord.js').Events} Events 이벤트 클래스
 * @typedef {import('discord.js').GatewayIntentBits} GatewayIntentBits 게이트웨이 의도 비트 클래스
 * @typedef {import('discord.js').Collection} Collection 컬렉션 클래스
 */

// Discord.js 라이브러리에서 필요한 클래스와 객체를 가져온다
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');

// Node.js의 내장 파일 시스템 모듈(파일 읽고 쓰기 기능)
// Node.js의 내장 경로 처리 모듈
const fs = require('node:fs');
const path = require('node:path');

const { TOKEN, GUILD_ID, ANNOUNCE_CHANNEL_ID } = require('./config.json'); // 설정 파일에서 값 가져오기

const { morningCall } = require('./schedule/morningCall'); // 아침 인사 모듈 가져오기


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


client.once(Events.ClientReady, readyClient => {

	console.log(`${readyClient.user.tag}가 깨어났다`);
	console.log(`discord.js 버전  : ` + require('discord.js').version);
	console.log(`봇의 서버 시간대: ${Intl.DateTimeFormat().resolvedOptions().timeZone}`);


    // 아침 인사 기능 초기화
    morningCall(client, GUILD_ID, ANNOUNCE_CHANNEL_ID);
});


/**
 * InteractionCreate 이벤트를 처리
 * 사용자가 디스코드 봇과 상호작용(예: 슬래시 명령어 입력)할 때 발생하는 이벤트.
 *
 * @event Events.InteractionCreate
 * @param {import('discord.js').Interaction} interaction - 발생한 상호작용 객체
 */
client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;

	/**
	 * 입력된 명령어 이름으로 등록된 명령어를 가져옵니다.
	 * @type {import('./commands').Command | undefined}
	 */
	const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`${interaction.commandName}을 찾을 수 없습니다`);
		return;
	}

		/**
		 * 에러가 발생했을 때 이미 응답이 처리되었는지 확인합니다.
		 * - 응답이 이미 처리되었으면 `followUp`으로 추가 응답을 보냅니다.
		 * - 응답이 처리되지 않았으면 `reply`로 새로 응답을 보냅니다.
		 */
	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: ' followUp -> 🍨 명령어 실행 중 에러가 발생했습니다', ephemeral: true });
		} else {
			await interaction.reply({ content: 'reply -> 🍨 명령어 실행 중 에러가 발생했습니다', ephemeral: true });
		}
	}
});


/**
 * 클라이언트 토큰으로 디스코드에 로그인합니다.
 * @param {string} TOKEN 개인 토큰 (config.json 파일에 저장)
 * @returns {Promise<string>} 로그인 성공 시 프로미스 해결
 */
client.login(TOKEN);
