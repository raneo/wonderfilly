const wArr = require("../data.json");
const { SlashCommandBuilder } = require('discord.js');

exports.build = (client) => {
  return new SlashCommandBuilder().setName(client.config.prefix + 'help').setDescription('WonderFilly: Hilfe');
};

exports.run = async (client, interaction) => {
  var tempStr = [
    "• **Infopanel:** `/wfi [WunderSynonym] [WunderStufe]`\n",
    "• **Infopanel:** `/wfi [WunderSynonym] [WunderStufe] [IngameName]`\n" +
    "• **belegte Truhen eintragen (VOR Ausbaustart):** `/wfblock [TruhenNr] [Name]`\n   Angabe von Name optional.\n" +
    "• **Ausbau starten:** `/wfgo`\n" +
    "• **Reservierung einer Truhe:** `/wff [TruhenNr]`\n   Erste Eingabe reserviert Truhe, zweite Eingabe bestätigt Einzahlung.\n" +
    "• **Reservierung aufheben:** `/wff -[TruhenNr]`\n" +
    "• **Ausbau beenden und Channel aufräumen:** `/wfdel`\n",
    "• **WonderFilly Hilfe:** `/wfhelp`\n" +
    "• **Support:** Falls ihr das Projekt finanziell unterstützen wollt, könnt ihr das hier: <https://ko-fi.com/K3K1FAF8U> \n" +
    "\xA0\n• **Liste der WunderSynonyme:**\n",
    "" // will get filled with the synonyms/names from data.json
  ];

  // header
  if (interaction.guildId === null) {
    await interaction.reply(tempStr[0] + tempStr[2]);
  } else {
    await interaction.reply(tempStr[1] + tempStr[2]);
  }
  
  // list and footer
  var channel = await client.channels.fetch(interaction.channelId);
  for (i = 0; i < wArr.length; i++) {
    for (j = 0; j < wArr[i].synonyms.length; j++) {
      tempStr[3] += "`" + wArr[i].synonyms[j] + "` ";
    }
    tempStr[3] += " - " + wArr[i].name_ger + "\n";

    if ((i > 1 && (i % 20) == 0) || i == (wArr.length - 1)) {
      await channel.send(tempStr[3]);
      tempStr[3] = '';
    }
  }
}
