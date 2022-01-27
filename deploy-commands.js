/**
 * @fileoverview deploy slashcommands to discord api once
 * @author raneo
 */
const namespace = 'deploy-commands';

// -----------------------------------------------------------------------------
// Requirements
// -----------------------------------------------------------------------------

const fs = require('fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const logger = require('./modules/logger.js');
const { clientId, guildId, token } = require('./config/auth.json');

// -----------------------------------------------------------------------------
// Helpers
// -----------------------------------------------------------------------------

const commands = [];
const commandFiles =
	fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	commands.push(command.data.toJSON());
}

// -----------------------------------------------------------------------------
// Public Interface
// -----------------------------------------------------------------------------

const rest = new REST({ version: '9' }).setToken(token);
rest.put(
	Routes.applicationGuildCommands(clientId, guildId),
	{ body: commands },
).then(
	() => logger.info(
		'Successfully registered application commands.',
		namespace,
	),
).catch(console.error);
