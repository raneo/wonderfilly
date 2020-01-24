const update = require("../modules/update.js");
exports.run = async (client, message, args) => {
  if (message.channel.type === "dm") return; // do not respond to DM

  var tempOutput = client.wfChannel.get(message.channel.id);
  // clear chat history
  message.channel.bulkDelete(100)
    .catch(error => console.log(`[c/go]: ${error}`));
 // post new info panel and start the process
  tempOutput.pointer = await message.channel.send("loading data...");
  tempOutput.flagStarted = true;
  let roleWB = message.guild.roles.find(role => role.name === "Wunderbauer");
  message.channel.send("Wunderaubau gestartet! " + roleWB + "\nReservieren/Einzahlung bestätigen: `/wff [TruhenNr]`\nReservierung aufheben: `/wff -[TruhenNr]`\nAusbau beenden: `/wfdel`");
  tempOutput.pointer.pin();
  update(client, message, tempOutput);
}
