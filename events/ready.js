module.exports = (client) => {
  client.user.setActivity(`Elvenar`);
  console.log(`[e/ready] Successfully started application! guilds:${client.guilds.size} channels:${client.channels.size} users:${client.users.size}`);
};
