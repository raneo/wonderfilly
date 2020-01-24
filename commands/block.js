const update = require("../modules/update.js");
exports.run = async (client, message, args) => {
  if (message.channel.type === "dm") return; // do not respond to DM
  message.delete().catch(error=>{console.log(error)}); // delete command

  var tempOutput = client.wfChannel.get(message.channel.id);
  if (tempOutput.flagStarted) {
    message.channel.send("Wunderausbau wurde schon gestartet. `/wfblock` bitte stets **vor** Start des Ausbaus (`/wfgo`)");
    return;
  }
  var chestID = parseInt(args.shift());
  // "out of bounds" check
  if (chestID == 0 || Math.abs(chestID) > tempOutput.table.length-2 || isNaN(chestID) ) {
    message.channel.send(`Die gewünschte Truhe ${chestID} existiert nicht.`);
    return;
  }
  if (chestID > 0) {
    // new block entry
    tempOutput.table[chestID+1][3] = "OK";
    tempOutput.table[chestID+1][4] = (args.join(" ") == "") ? "belegt" : args.join(" ");
  } else {
    // remove block entry
    tempOutput.table[Math.abs(chestID)+1][3] = null;
    tempOutput.table[Math.abs(chestID)+1][4] = null;
  }
  update(client, message, tempOutput);
}
