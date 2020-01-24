const wArr = require("../data.json");
const update = require("../modules/update.js");
exports.run = async (client, message, args) => {

  var tempOutput = client.wfChannel.get(message.channel.id);
  if (message.channel.type !== "dm" && tempOutput.flagBuilderSet) {
    message.channel.send(`<@${message.author.id}> ` + "Es kann kein neues Infopanel aufgerufen werden, solange sich noch ein Wunder im Ausbau befindet. Bitte erst mit `/wfdel` beenden.");
    return;
  }

  args[0] = args[0].toLowerCase(); // synonym toLowerCase
  var wonderID = -1; // find synonym and set wonderID
  for (i = 0; i < wArr.length; i++) {
    if (wArr[i].synonyms.includes(args[0])) {
      wonderID = i;
      //console.log("[c/i] wonderID:" + wonderID);
      break;
    }
  }
  // if no synonym is found return
  if (wonderID == -1) {
    message.channel.send("Ein Wunder mit dem Synonym '" + args[0] + "` ist mir nicht bekannt. :thinking: ");
    return;
  }
  args.shift(); // popping the synonym
  var wonderLevel = args.shift(); // popping the level
  // checks 1,6,... and empty entries
  if (wArr[wonderID].data[wonderLevel] === null || wArr[wonderID].data[wonderLevel] === undefined) {
    message.channel.send(`Für den Ausbau auf Stufe ${wonderLevel} liegen mir keine Daten vor. :rolling_eyes:`);
    return;
  }
  // check for ingameName in case of a channel message
  if (message.channel.type === "text" && args.join(" ") == "") {
    message.channel.send("Für den Ausbau fehlt noch der IngameName `/wfi [WunderSynonym] [WunderStufe] [IngameName]`");
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
    builderID: message.author.id,
    headerDm:
    "═══ **《 " + wonderLevel + " 》 " + wArr[wonderID].name_ger + "**   ═══\n" +
    "Forschung: " + wArr[wonderID].data[wonderLevel][0] + " (" + wpCost + ") WP",
    table: xTable
  };

  output.headerText = "Ansprechpartner: <@" + message.author.id + ">\n" + output.headerDm + " │ IngameName: `" + args.join(" ") + "`";
  // remembering the message (to be able to edit it later)
  output.pointer = await message.channel.send("loading data...");

  // in case there was an author argument
  if (args.join(" ") != "") output.flagBuilderSet = true;

  update(client, message, output);
}
