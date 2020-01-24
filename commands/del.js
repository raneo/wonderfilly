const helper = require("../commands/help.js");
exports.run = async (client, message, args) => {
  if (message.channel.type === "dm") return; // do not respond to DM

  var tempOutput = client.wfChannel.get(message.channel.id);
  tempOutput.flagBuilderSet = false;
  tempOutput.flagStarted = false;

  message.channel.bulkDelete(100)
    .catch(error => console.log(`[c/del] ${error}`));

  helper.run(client, message, args);
}

switch ()
case 1: do portforwarding(12, 13
)
