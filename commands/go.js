const update = require("../modules/update.js");
const { SlashCommandBuilder } = require('discord.js');

exports.build = (client) => {
  return new SlashCommandBuilder().setName(client.config.prefix + 'go').setDescription('Wonderfilly: Ausbau starten');
};

exports.run = async (client, interaction) => {
  // do not respond to DM
  if (interaction.guildId === null) {
    await interaction.reply('Dieser Befehl funktioniert nur auf einem Discord-Server. Versuche es in einem Wonderfilly-Channel noch einmal! :)');
    return;
  }

  var tempOutput = client.wfChannel.get(interaction.channelId);
  if (tempOutput === null) {
    await interaction.reply('Bevor der Wunderausbau gestartet werden kann, muss ein Infopanel mit `/wfi [WunderSynonym] [WunderStufe] [IngameName]` für diesen angelegt werden.')
    return;
  }

  // clear chat history
  client.channels.fetch(interaction.channelId)
    .then(channel => channel.bulkDelete(100, true))
    .catch(error => console.log(`[c/del] ${error}`));

  // post new info panel and start the process
  await interaction.reply('loading data...');
  tempOutput.pointer = await interaction.fetchReply();
  tempOutput.flagStarted = true;
  var roles = await interaction.member.guild.roles.fetch();
  let roleWB = roles.find(role => role.name === "Wunderbauer");
  var channel = await client.channels.fetch(interaction.channelId);
  await channel.send({
    content: "Wunderaubau gestartet! " + roleWB.toString() + "\nReservieren/Einzahlung bestätigen: `/wff [TruhenNr]`\nReservierung aufheben: `/wff -[TruhenNr]`\nAusbau beenden: `/wfdel`",
    allowedMentions: {roles: [roleWB.id]}
  });
  tempOutput.pointer.pin();
  update(client, interaction, tempOutput);
}
