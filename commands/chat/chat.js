// const { SlashCommandBuilder, CommandInteraction } = require('discord.js');
// const { Configuration, OpenAIApi } = require('openai');

// module.exports = {
//   data: new SlashCommandBuilder()
//     .setName('chat')
//     .setDescription('OpenAI API for chat')
//     .addStringOption(option =>
//       option.setName('input')
//         .setDescription('대화를 입력해보세요 (필수)')
//         .setRequired(true)),

//   /**
//    * @param {Client} client
//    * @param {CommandInteraction} interaction
//    */
//   run: async (client, interaction) => {
//     const prompt = interaction.options.getString('input');

//     await interaction.reply({ content: `.......`, ephemeral: true });

//     const configuration = new Configuration({
//       apiKey: "YOUR_OPENAI_API_KEY", // Replace with your actual OpenAI API key
//     });
//     const openai = new OpenAIApi(configuration);

//     try {
//       const response = await openai.createCompletion({
//         model: 'text-davinci-003', // Consider other models for different use cases
//         prompt: prompt,
//         max_tokens: 2048,
//         temperature: 0.7,
//         top_p: 1,
//         frequency_penalty: 0.0,
//         presence_penalty: 0.0,
//       });

//       let responseMessage = '> ' + prompt + response.data.choices[0].text;

//       if (responseMessage.length >= 2000) {
//         const attachment = new AttachmentBuilder(Buffer.from(responseMessage, 'utf-8'), { name: 'response.txt' });
//         await interaction.reply({ files: [attachment] });
//       } else {
//         await interaction.reply(responseMessage);
//       }
//     } catch (error) {
//       console.error(error); // Handle errors appropriately, like sending an error message to the user
//       await interaction.reply('문제 발생.');
//     }
//   },
// };