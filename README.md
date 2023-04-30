Discord Tournament Bot
A work-in-progress Discord bot that organizes and runs tournaments between players. The bot utilizes the OpenAI GPT-4 API to determine the outcome of each match between the players.

Features
Players can join the tournament using the !join command.
The tournament begins when the !start command is initiated.
Results of the matches are determined using OpenAI's GPT-4 API.

The bot will continue the tournament until only one player remains, who is declared the winner.

Setup
Clone this repository:
git clone *

Install the required dependencies:

npm install

Create a .env file in the root of the project folder with the following content:

TOKEN=your-discord-bot-token
API_KEY=your-openai-api-key

Replace your-discord-bot-token with your actual Discord bot token and your-openai-api-key with your OpenAI API key.

Start the bot:

node index.js

The bot is now running and can be used in your Discord server.

Usage
To join the tournament, type !join in any channel where the bot is present.
To start the tournament, type !start. The bot will begin the matches and announce the results in the same channel.

Note: This project is still in development. Features may change, and new features may be added in the future. Any contributions, suggestions, or feedback are welcome.

License
This project is licensed under the MIT License.
