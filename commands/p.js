const wArr = require("../data.json");
const transf = require("../modules/tableToString.js");
exports.run = async (client, message, args) => {

  if (message.channel.type !== "dm") return; // do not respond to channel messages

  var wonderID = -1; // find synonym and set wonderID
  for (i = 0; i < wArr.length; i++) {
    if (wArr[i].synonyms.includes(args[0])) {
      wonderID = i;
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
  var kpOwner = args.shift(); // popping the KP contributed by owner
  var kpCost = wArr[wonderID].data[wonderLevel][0];
  var content = [
    " T │  WP │ R │ Ext │ Min │ ++ ",
    "═══╪═════╪═══╪═════╪═════╪════"
  ];

  // looking up the data for each chest and storing the table in "content"
  for (i = 1; i < wArr[wonderID].data[wonderLevel].length; i++) {
    // calculating the KP actually needed
    kpCost -= wArr[wonderID].data[wonderLevel][i][0];
    // filling the content table
    content[i+1] = [ i,
      wArr[wonderID].data[wonderLevel][i][0],
      wArr[wonderID].data[wonderLevel][i][1]
    ];
  }

  var output = {
    flagStarted: false,
    flagBuilderSet: false,
    builderID: message.author.id,
    headerDm:
    "═══ **《 " + wonderLevel + " 》 " + wArr[wonderID].name_ger + "**   ═══\n" +
    "Forschung: " + wArr[wonderID].data[wonderLevel][0] + " (" + kpCost + ") WP\n```\n" +
    " T  │  WP │ R │      Helfer\n════╪═════╪═══╪════╤══════════",
    headerText:
    "Ansprechpartner: <@" + message.author.id + ">\n═══ **《 " + wonderLevel + " 》 " + wArr[wonderID].name_ger + "**   ═══\n" +
    "Forschung: " + wArr[wonderID].data[wonderLevel][0] + " (" + kpCost + ") WP  │  IngameName:  `" + args.join(" ") + "`\n```\n" +
    " T  │  WP │ R │      Helfer\n════╪═════╪═══╪════╤══════════",
    table: content
  };

  // in case there was no author argument
  if (args.join(" ") != "") output.flagBuilderSet = true;
  console.log("[c/i] author set: " + output.flagBuilderSet);

  // remembering the message (to be able to edit it later)
  output.pointer = await message.channel.send("loading data...");

  update(client, message, output);
}
