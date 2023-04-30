require('dotenv/config');
const { Client, IntentsBitField } = require('discord.js');
const { Configuration, OpenAIApi } = require('openai');

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

client.on('ready', () => {
  console.log('The bot is online!');
});

const configuration = new Configuration({
  apiKey: process.env.API_KEY,
});
const openai = new OpenAIApi(configuration);

let players = [];

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;

  const args = message.content.slice(1).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if (message.content.startsWith('!join')) {
    if (!players.includes(message.author.id)) {
      players.push(message.author.id);
      message.channel.send(`${message.author} has joined the tournament!`);
    } else {
      message.channel.send(`${message.author}, you're already in the tournament!`);
    }
  } else if (message.content.startsWith('!start')) {
    const hasSenatorRole = message.member.roles.cache.some(role => role.name === 'Senator');

    if (!hasSenatorRole) {
      message.channel.send('You need the Senator role to start the tournament.');
      return;
    }

    if (players.length < 2) {
      message.channel.send('Not enough players to start the tournament.');
      return;
    }

    while (players.length > 1) {
      const player1 = players[0];
      const player2 = players[1];
      const prompt = `Player ${player1} fights against Player ${player2} in a tournament.Simulate the battle. Who wins?`;

      try {
        const result = await openai.createChatCompletion({
          model: 'gpt-4',
          messages: [
            { role: 'system', content: 'You are a friendly chatbot.' },
            { role: 'user', content: prompt },
          ],
          max_tokens: 50,
          temperature: 0.7,
        });

        const winner = result.data.choices[0].message.content.trim();
        message.channel.send(`Player ${winner} has won the match!`);

        const loser = winner === player1 ? player2 : player1;
        players.splice(players.indexOf(loser), 1);
      } catch (error) {
        console.log(`OPENAI ERR: ${error}`);
        message.channel.send('An error occurred while determining the match result.');
      }
    }

    message.channel.send(`Congratulations, Player ${players[0]}! You are the tournament winner!`);
    players = [];
  }
});

client.login(process.env.TOKEN);