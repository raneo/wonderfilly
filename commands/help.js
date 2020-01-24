const wArr = require("../data.json");
exports.run = async (client, message, args) => {
  var tempStr = [
    "• **Infopanel:** `/wfi [WunderSynonym] [WunderStufe]`\n",
    "• **Infopanel:** `/wfi [WunderSynonym] [WunderStufe] [IngameName]`\n" +
    "• **belegte Truhen eintragen (VOR Ausbaustart):** `/wfblock [TruhenNr] [Name]`\n   Angabe von Name optional.\n" +
    "• **Ausbau starten:** `/wfgo`\n" +
    "• **Reservierung einer Truhe:** `/wff [TruhenNr]`\n   Erste Eingabe reserviert Truhe, zweite Eingabe bestätigt Einzahlung.\n" +
    "• **Reservierung aufheben:** `/wff -[TruhenNr]`\n" +
    "• **Ausbau beenden und Channel aufräumen:** `/wfdel`\n",
    "• **WonderFilly Hilfe:** `/wfhelp`\n" +
    "\xA0\n• **Liste der WunderSynonyme:**\n",
    "" // will get filled with the synonyms/names from data.json
  ];
  for (i = 0; i < wArr.length; i++) {
    for (j = 0; j < wArr[i].synonyms.length; j++) {
      tempStr[3] += "`" + wArr[i].synonyms[j] + "` ";
    }
    tempStr[3] += " - " + wArr[i].name_ger + "\n";
  }
  // header
  if (message.channel.type === "dm") {
    message.channel.send(tempStr[0] + tempStr[2]);
  } else {
    message.channel.send(tempStr[1] + tempStr[2]);
  }
  message.channel.send(tempStr[3]); // list and footer
}
