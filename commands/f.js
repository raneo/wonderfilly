const update = require("../modules/update.js");
exports.run = async (client, message, args) => {
  if (message.channel.type === "dm") return; // do not respond to DM
  message.delete().catch(error=>{console.log(error)}); // delete command

  var tempOutput = client.wfChannel.get(message.channel.id);
  if (!tempOutput.flagStarted) {
    message.channel.send("Wunderausbau wurde noch nicht gestartet. Bitte erst mit `/wfgo` initialisieren.");
    return;
  }
  var chestID = parseInt(args.shift());
  // "out of bounds" check
  if (chestID == 0 || Math.abs(chestID) > tempOutput.table.length-2 || isNaN(chestID) ) {
    message.channel.send(`Die gewünschte Truhe ${chestID} existiert nicht.`);
    return;
  }
  if (chestID > 0) {
    // new entry
    switch(tempOutput.table[chestID+1][3]) {
      case undefined:
      case null:
        tempOutput.table[chestID+1][3] = "••";
        tempOutput.table[chestID+1][4] = message.author.username;
        break;
      case "••":
        if (tempOutput.table[chestID+1][4] == message.author.username) {
          tempOutput.table[chestID+1][3] = "OK";
        } else {
          message.channel.send(`**${chestID}.** Truhe bereits für ${tempOutput.table[chestID+1][4]} reserviert. Bitte Alternative wählen <@${message.author.id}>.`);
        }
        break;
      case "OK":
        message.channel.send(`**${chestID}.** Truhe bereits belegt. Bitte Alternative wählen <@${message.author.id}>.`);
        break;
    }
  } else {
    // remove entry
    switch(tempOutput.table[Math.abs(chestID)+1][3]) {
      case "••":
      case "OK":
        if (tempOutput.table[Math.abs(chestID)+1][4] == message.author.username) {
          tempOutput.table[Math.abs(chestID)+1][3] = null;
          tempOutput.table[Math.abs(chestID)+1][4] = null;
          message.channel.send(`**${Math.abs(chestID)}.** Truhe freigegeben von ${message.author.username}.`);
        } else {
          message.channel.send(`**${Math.abs(chestID)}.** Truhe kann nur von ${tempOutput.table[Math.abs(chestID)+1][4]} freigegeben werden.`);
        }
        break;
    }
  }

  update(client, message, tempOutput);
}
