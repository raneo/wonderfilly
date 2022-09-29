# wonderfilly
Discord ChatBot for a browsergame called "Elvenar" to display detailed information about ancient wonders

![example](ch_example1.jpg?raw=true "Title")

## Setup

- [create Discord bot](https://discordjs.guide/preparations/setting-up-a-bot-application.html#creating-your-bot)
	- write down OAuth2 client id and Discord bot token
- [invite bot to the servers you want](https://discordjs.guide/preparations/adding-your-bot-to-servers.html#bot-invite-links)

	You can, but do not have to, use the following template for an invite link that can be used to add it to your servers:

	```
	https://discord.com/api/oauth2/authorize?client_id=<oauth2 client id>&permissions=2416143360&scope=bot%20applications.commands
	```

	It has the necessary permissions for this specific bot already set.

- clone Git repo
- copy `config.example.json` to `config.json` and replace the placeholders in it
- `npm update`
- `node index.js`

	Alternatively you can also use the Dockerfile to build a Docker image, and run it:

	```
	docker build --name wonderfilly .
	docker run -it -v $(pwd)/config.json:/home/node/app/config.json --name wonderfilly wonderfilly
	```

Now you should be able to use all commands in the specified channels and some of them in DMs.

## Support

In case you like the wonderfilly project and want to support it for updates and hosting expenses:

[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/K3K1FAF8U)
