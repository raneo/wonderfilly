const { SlashCommandBuilder } = require('discord.js');

exports.build = (client) => {
  return new SlashCommandBuilder().setName(client.config.prefix + 'ping').setDescription('Wonderfully: Check bot status');
};

exports.run = async (client, interaction) => {
  var ts1 = Date.now();
  await interaction.reply("Ping?");
  var ts2 = Date.now();
  interaction.editReply(`Pong! Latency is ${ts2 - ts1}ms. API Latency is ${Math.round(client.ws.ping)}ms`);
}
