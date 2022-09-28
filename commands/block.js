const update = require("../modules/update.js");
const { SlashCommandBuilder } = require('discord.js');

exports.build = (client) => {
  return new SlashCommandBuilder()
    .setName(client.config.prefix + 'block')
    .setDescription('Wonderfilly: belegte Truhen eintragen (VOR Ausbaustart)')
    .addIntegerOption(option => option.setName('truhennr').setDescription('Truhen-Nr.').setRequired(true))
    .addNumberOption(option => option.setName('name').setDescription('Name (optional)').setRequired(false));
};

exports.run = async (client, interaction) => {
  // do not respond to DM
  if (interaction.guildId === null) {
    await interaction.reply('Dieser Befehl funktioniert nur auf einem Discord-Server. Versuche es in einem Wonderfilly-Channel noch einmal! :)');
    return;
  }

  var tempOutput = client.wfChannel.get(interaction.channelId);
  if (tempOutput === null) {
    await interaction.reply('Wovor belegte Truhen eingetragen werden können, muss ein Infopanel mit `/wfi [WunderSynonym] [WunderStufe] [IngameName]` für den Wunderausbau angelegt werden.')
    return;
  }
  if (tempOutput.flagStarted) {
    await interaction.reply("Wunderausbau wurde schon gestartet. `/wfblock` bitte stets **vor** Start des Ausbaus (`/wfgo`)");
    return;
  }
  var chestID = interaction.options.getInteger('truhennr');
  // "out of bounds" check
  if (chestID == 0 || Math.abs(chestID) > tempOutput.table.length-2 || isNaN(chestID) ) {
    await interaction.reply(`Die gewünschte Truhe ${chestID} existiert nicht.`);
    return;
  }
  if (chestID > 0) {
    var name = interaction.options.getString('name');

    // new block entry
    tempOutput.table[chestID+1][3] = "OK";
    tempOutput.table[chestID+1][4] = name === null ? "belegt" : name;
  } else {
    // remove block entry
    tempOutput.table[Math.abs(chestID)+1][3] = null;
    tempOutput.table[Math.abs(chestID)+1][4] = null;
  }

  // So that it does not spam the chat
  await interaction.reply('loading data...');
  await interaction.deleteReply();

  update(client, interaction, tempOutput);
}
