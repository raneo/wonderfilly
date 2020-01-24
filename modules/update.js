const transf = require("../modules/tableToString.js");
module.exports = (client, message, tempOutput) => {
  var tempStr = (message.channel.type === "dm") ? tempOutput.headerDm : tempOutput.headerText;
  var paidChests = 0;
  for (i = 2; i < tempOutput.table.length; i++){
    if (tempOutput.table[i][3] === "OK") paidChests++;
  }
  tempOutput.pointer.edit(tempStr + transf(tempOutput.table));
  client.wfChannel.set(message.channel.id, tempOutput); // storing the output object in the wfChannel map
  //console.log(`[modules/update] paidChests: ` + paidChests);
  if (paidChests == tempOutput.table.length-2) { // all chests taken and paid?
    message.channel.send(`Alle Truhen wurden vollständig eingezahlt! <@${tempOutput.builderID}>`);
  }
}
