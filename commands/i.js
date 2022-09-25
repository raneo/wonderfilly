const wArr = require("../data.json");
const update = require("../modules/update.js");
const { SlashCommandBuilder } = require('discord.js');

exports.build = (client) => {
  return new SlashCommandBuilder()
    .setName(client.config.prefix + 'i')
    .setDescription('Wonderfilly: Infopanel')
    .addStringOption(option => option.setName('synonym').setDescription('Wundersynonym').setRequired(true))
    .addIntegerOption(option => option.setName('level').setDescription('Wunderstufe').setRequired(true))
    .addStringOption(option => option.setName('name').setDescription('Ingame-Name').setRequired(true));
};

exports.run = async (client, interaction) => {

  var tempOutput = client.wfChannel.get(interaction.channelId);
  if (interaction.guildId !== null && tempOutput.flagBuilderSet) {
    await interaction.reply(`<@${interaction.user.id}> ` + "Es kann kein neues Infopanel aufgerufen werden, solange sich noch ein Wunder im Ausbau befindet. Bitte erst mit `/wfdel` beenden.");
    return;
  }

  var query = interaction.options.getString('synonym').toLowerCase(); // synonym toLowerCase
  var wonderID = -1; // find synonym and set wonderID
  for (i = 0; i < wArr.length; i++) {
    if (wArr[i].synonyms.includes(query)) {
      wonderID = i;
      //console.log("[c/i] wonderID:" + wonderID);
      break;
    }
  }
  // if no synonym is found return
  if (wonderID == -1) {
    await interaction.reply("Ein Wunder mit dem Synonym '" + interaction.options.getString('synonym') + "` ist mir nicht bekannt. :thinking: ");
    return;
  }
  var wonderLevel = interaction.options.getInteger('level');
  // checks 1,6,... and empty entries
  if (wArr[wonderID].data[wonderLevel] === null || wArr[wonderID].data[wonderLevel] === undefined) {
    await interaction.reply(`Für den Ausbau auf Stufe ${wonderLevel} liegen mir keine Daten vor. :rolling_eyes:`);
    return;
  }
  // check for ingameName in case of a channel message
  var ingameName = interaction.options.getString('name');
  if (ingameName === null) {
    await interaction.reply("Für den Ausbau fehlt noch der IngameName `/wfi [WunderSynonym] [WunderStufe] [IngameName]`");
    return;
  }

  var wpCost = wArr[wonderID].data[wonderLevel][0];
  var xTable = [
    " T │  WP │ R │      Helfer",
    "═══╪═════╪═══╪════╤════════"
  ]

  // looking up the data for each chest and storing the table in "content"
  for (i = 1; i <= wArr[wonderID].data[wonderLevel].length - 1; i++) {
    // calculating the KP actually needed
    wpCost -= wArr[wonderID].data[wonderLevel][i][0];
    // filling the content table
    xTable[i+1] = [ i, wArr[wonderID].data[wonderLevel][i][0], wArr[wonderID].data[wonderLevel][i][1] ];
  }

  var output = {
    flagStarted: false,
    flagBuilderSet: false,
    builderID: interaction.user.id,
    headerDm:
    "═══ **《 " + wonderLevel + " 》 " + wArr[wonderID].name_ger + "**   ═══\n" +
    "Forschung: " + wArr[wonderID].data[wonderLevel][0] + " (" + wpCost + ") WP",
    table: xTable
  };

  output.headerText = "Ansprechpartner: <@" + interaction.user.id + ">\n" + output.headerDm + " │ IngameName: `" + ingameName + "`";
  await interaction.reply("loading data...");
  // remembering the message (to be able to edit it later)
  output.pointer = await interaction.fetchReply();

  // in case there was an author argument
  if (ingameName !== null) output.flagBuilderSet = true;

  update(client, interaction, output);
}
