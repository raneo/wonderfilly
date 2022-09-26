const transf = require("../modules/tableToString.js");
module.exports = async (client, interaction, tempOutput) => {
  var tempStr = (interaction.guildId === null) ? tempOutput.headerDm : tempOutput.headerText;
  var paidChests = 0;
  for (i = 2; i < tempOutput.table.length; i++){
    if (tempOutput.table[i][3] === "OK") paidChests++;
  }
  tempOutput.pointer.edit(tempStr + transf(tempOutput.table));
  client.wfChannel.set(interaction.channelId, tempOutput); // storing the output object in the wfChannel map
  //console.log(`[modules/update] paidChests: ` + paidChests);
  if (paidChests == tempOutput.table.length-2) { // all chests taken and paid?
    var channel = await client.channels.fetch(interaction.channelId);
    await channel.send({
      content: `Alle Truhen wurden vollständig eingezahlt! <@${tempOutput.builderID}>`,
      allowedMentions: {users: [tempOutput.builderID]}
    });
  }
}
