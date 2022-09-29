const helper = require("../commands/help.js");
const { SlashCommandBuilder } = require('discord.js');

exports.build = (client) => {
  return new SlashCommandBuilder().setName(client.config.prefix + 'del').setDescription('Wonderfilly: Ausbau beenden und Channel aufräumen');
};

exports.run = async (client, interaction) => {
  // do not respond to DM
  if (interaction.guildId === null) {
    await interaction.reply('Dieser Befehl funktioniert nur auf einem Discord-Server. Versuche es in einem Wonderfilly-Channel noch einmal! :)');
    return;
  }

  var tempOutput = client.wfChannel.get(interaction.channelId);
  if (tempOutput !== null) {
    tempOutput.flagBuilderSet = false;
    tempOutput.flagStarted = false;
  }

  client.channels.fetch(interaction.channelId)
    .then(channel => channel.bulkDelete(100, true))
    .catch(error => console.log(`[c/del] ${error}`));

  helper.run(client, interaction);
}
