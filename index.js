const Discord = require("discord.js");
const Enmap = require("enmap");
const fs = require("fs");

const config = require("./config.json");
const client = new Discord.Client({ intents: [Discord.GatewayIntentBits.Guilds] });
const rest = new Discord.REST({ version: '10' }).setToken(config.token);
// We also need to make sure we're attaching the config to the CLIENT so it's accessible everywhere!
client.config = config;

fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    const event = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    client.on(eventName, event.bind(null, client));
  });
});

client.commands = new Enmap();
client.wfChannel = new Map();
client.wfChannel.set(config.onChannel[0], {}); //spassbad wondertest
client.wfChannel.set(config.onChannel[1], {}); //spassbad wonderfilly
client.wfChannel.set(config.onChannel[2], {}); //expect us wonderfilly-1
client.wfChannel.set(config.onChannel[3], {}); //expect us wonderfilly-2
client.wfChannel.set(config.onChannel[4], {}); //christa wonderfilly-1
client.wfChannel.set(config.onChannel[5], {}); //christa andereWelten-1
client.wfChannel.set(config.onChannel[6], {}); //christa andereWelten-1
client.wfChannel.set(config.onChannel[7], {}); //christa andereWelten-1
client.wfChannel.set(config.onChannel[8], {}); //christa andereWelten-1
client.wfChannel.set(config.onChannel[9], {}); //christa andereWelten-1

fs.readdir("./commands/", (err, files) => {
  var slashCommands = [];

  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    let props = require(`./commands/${file}`);
    let commandName = file.split(".")[0];
    console.log(`[index] Attempting to load command ${commandName}`);
    client.commands.set(commandName, props);
    slashCommands.push(props.build(client));
  });

  // Register application commands to Discord
  rest.put(Discord.Routes.applicationCommands(config.clientId), { body: slashCommands.map(slashCommand => slashCommand.toJSON()) })
    .then((data) => console.log(`[index] Registered ${data.length} application commands to Discord`))
    .catch(console.log);
});

try {
  client.login(config.token);
} catch (error) {
  console.log(`[index] Error: ${error}`);
}
