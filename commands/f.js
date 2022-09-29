const update = require("../modules/update.js");
const { SlashCommandBuilder } = require('discord.js');

exports.build = (client) => {
  return new SlashCommandBuilder()
    .setName(client.config.prefix + 'f')
    .setDescription('Wonderfilly: Reservierung einer Truhe')
    .addIntegerOption(option => option.setName('truhennr').setDescription('Truhen-Nr.').setRequired(true));
};

exports.run = async (client, interaction) => {
  // do not respond to DM
  if (interaction.guildId === null) {
    await interaction.reply('Dieser Befehl funktioniert nur auf einem Discord-Server. Versuche es in einem Wonderfilly-Channel noch einmal! :)');
    return;
  }

  var tempOutput = client.wfChannel.get(interaction.channelId);
  if (tempOutput === null) {
    await interaction.reply('Bevor Truhen reserviert werden können, muss ein Infopanel mit `/wfi [WunderSynonym] [WunderStufe] [IngameName]` für den Wunderausbau angelegt werden und dieser mit `/wfgo` gestartet werden.')
    return;
  }
  if (!tempOutput.flagStarted) {
    await interaction.reply("Wunderausbau wurde noch nicht gestartet. Bitte erst mit `/wfgo` initialisieren.");
    return;
  }
  var chestID = interaction.options.getInteger('truhennr');
  // "out of bounds" check
  if (chestID == 0 || Math.abs(chestID) > tempOutput.table.length-2 || isNaN(chestID) ) {
    await interaction.reply(`Die gewünschte Truhe ${chestID} existiert nicht.`);
    return;
  }
  if (chestID > 0) {
    // new entry
    switch(tempOutput.table[chestID+1][3]) {
      case undefined:
      case null:
        tempOutput.table[chestID+1][3] = "••";
        tempOutput.table[chestID+1][4] = interaction.user.username;
        await interaction.reply('loading data...');
        await interaction.deleteReply();
        break;
      case "••":
        if (tempOutput.table[chestID+1][4] == interaction.user.username) {
          tempOutput.table[chestID+1][3] = "OK";
            // So that it does not spam the chat
            await interaction.reply('loading data...');
            await interaction.deleteReply();
        } else {
          await interaction.reply(`**${chestID}.** Truhe bereits für ${tempOutput.table[chestID+1][4]} reserviert. Bitte Alternative wählen <@${interaction.user.id}>.`);
        }
        break;
      case "OK":
        await interaction.reply(`**${chestID}.** Truhe bereits belegt. Bitte Alternative wählen <@${interaction.user.id}>.`);
        break;
    }
  } else {
    // remove entry
    switch(tempOutput.table[Math.abs(chestID)+1][3]) {
      case "••":
      case "OK":
        if (tempOutput.table[Math.abs(chestID)+1][4] == interaction.user.username) {
          tempOutput.table[Math.abs(chestID)+1][3] = null;
          tempOutput.table[Math.abs(chestID)+1][4] = null;
          await interaction.reply(`**${Math.abs(chestID)}.** Truhe freigegeben von ${interaction.user.username}.`);
        } else {
          await interaction.reply(`**${Math.abs(chestID)}.** Truhe kann nur von ${tempOutput.table[Math.abs(chestID)+1][4]} freigegeben werden.`);
        }
        break;
    }
  }

  update(client, interaction, tempOutput);
}
