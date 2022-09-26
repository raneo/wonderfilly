module.exports = (client) => {
  client.user.setActivity(`Elvenar`);
  console.log(`[e/ready] Successfully started application! guilds:${client.guilds.cache.size} channels:${client.channels.cache.size} users:${client.users.cache.size}`);
};
