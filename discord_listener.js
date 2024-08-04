const { Client, GatewayIntentBits } = require('discord.js-selfbot-v13');
const fs = require('fs');

const client = new Client();

const messagesData = [];
const monitoredChannels = [];

async function startBot(token) {
  try {
    await client.login(token);

    client.on('ready', () => {
      console.log(`Logged as: ${client.user.tag}`);
    });

    client.on('messageCreate', (message) => {
      if (message.author.bot) return; // Ignore bot messages

      if (monitoredChannels.includes(message.channel.id)) {
        const messageData = {
          author: message.author.tag,
          authorId: message.author.id,
          content: message.content,
          channel: message.channel.name,
          channelID: message.channel.id,
          timestamp: message.createdAt.toISOString(),
        };

        messagesData.push(messageData);

        fs.writeFileSync('data/messages.json', JSON.stringify(messagesData, null, 2));
      }
    });

    addMonitoredChannel('ID1');
    addMonitoredChannel('ID2');

  } catch (error) {
    console.error('Error occured when starting selfbot:', error);
  }
}

startBot("TOKEN")

function addMonitoredChannel(channelId) {
  monitoredChannels.push(channelId);
  console.log(`Added ${channelId} as listening channel.`);
}