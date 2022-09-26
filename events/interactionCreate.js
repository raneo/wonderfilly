const formatTime = require("../modules/formatTime.js");
module.exports = (client, interaction) => {
  //console.log(interaction);
  /* ChatInputCommandInteraction {
  type: 2,
  id: '1022572334705557575',
  applicationId: '1022500166206488637',
  channelId: '335479529046802432',
  guildId: '285047805058351104',
  user: User {
    id: '210495072838483968',
    bot: false,
    system: false,
    flags: UserFlagsBitField { bitfield: 0 },
    username: 'Jonniboy',
    discriminator: '0152',
    avatar: '3a12df376f5aaa479f25157eac9e8a6e',
    banner: undefined,
    accentColor: undefined
  },
  member: GuildMember {
    guild: Guild {
      id: '285047805058351104',
      name: 'Furious Gaming',
      icon: '3afc1eb02b18c4425d0aa28a88438145',
      features: [],
      commands: [GuildApplicationCommandManager],
      members: [GuildMemberManager],
      channels: [GuildChannelManager],
      bans: [GuildBanManager],
      roles: [RoleManager],
      presences: PresenceManager {},
      voiceStates: [VoiceStateManager],
      stageInstances: [StageInstanceManager],
      invites: [GuildInviteManager],
      scheduledEvents: [GuildScheduledEventManager],
      available: true,
      shardId: 0,
      splash: null,
      banner: null,
      description: null,
      verificationLevel: 0,
      vanityURLCode: null,
      nsfwLevel: 0,
      premiumSubscriptionCount: 0,
      discoverySplash: null,
      memberCount: 34,
      large: false,
      premiumProgressBarEnabled: false,
      applicationId: null,
      afkTimeout: 300,
      afkChannelId: null,
      systemChannelId: null,
      premiumTier: 0,
      widgetEnabled: null,
      widgetChannelId: null,
      explicitContentFilter: 0,
      mfaLevel: 0,
      joinedTimestamp: 1663858417945,
      defaultMessageNotifications: 0,
      systemChannelFlags: [SystemChannelFlagsBitField],
      maximumMembers: 500000,
      maximumPresences: null,
      maxVideoChannelUsers: 25,
      approximateMemberCount: null,
      approximatePresenceCount: null,
      vanityURLUses: null,
      rulesChannelId: null,
      publicUpdatesChannelId: null,
      preferredLocale: 'en-US',
      ownerId: '210495072838483968',
      emojis: [GuildEmojiManager],
      stickers: [GuildStickerManager]
    },
    joinedTimestamp: 1488031092791,
    premiumSinceTimestamp: null,
    nickname: null,
    pending: false,
    communicationDisabledUntilTimestamp: null,
    _roles: [
      '312350506133749760',
      '820941931055546368',
      '919750936166035458',
      '859461338346946611',
      '859458403835707412',
      '859493359504719892',
      '929054357205450872',
      '859461201201070110'
    ],
    user: User {
      id: '210495072838483968',
      bot: false,
      system: false,
      flags: [UserFlagsBitField],
      username: 'Jonniboy',
      discriminator: '0152',
      avatar: '3a12df376f5aaa479f25157eac9e8a6e',
      banner: undefined,
      accentColor: undefined
    },
    avatar: null
  },
  version: 1,
  appPermissions: PermissionsBitField { bitfield: 1071698665025n },
  memberPermissions: PermissionsBitField { bitfield: 4398046511103n },
  locale: 'de',
  guildLocale: 'en-US',
  commandId: '1022536160351887453',
  commandName: 'wfgo',
  commandType: 1,
  commandGuildId: '285047805058351104',
  deferred: false,
  replied: false,
  ephemeral: null,
  webhook: InteractionWebhook { id: '1022500166206488637' },
  options: CommandInteractionOptionResolver {
    _group: null,
    _subcommand: null,
    _hoistedOptions: []
  }
} */

  // Ignore all bots
  if (interaction.user.bot) return;

  // Ignore messages not starting with the prefix (in config.json)
  if (interaction.commandName.indexOf(client.config.prefix) !== 0) return;

  var args = interaction.options._hoistedOptions.map(option => `${option.name}=${option.value}`).join(' ');
  console.log(`[e/intCreate]${formatTime(new Date())}[${interaction.user.username}] ${interaction.commandName} ${args}`);

  // checks for the right channel and let DMs through
  if (!client.wfChannel.has(interaction.channelId) && (interaction.guildId !== null)) {
    console.log("[e/intCreate] channel check failed");
    return;
  }

  // Grab the command data from the client.commands Enmap
  const cmd = client.commands.get(interaction.commandName.substr(2));
  // If that command doesn't exist, silently exit and do nothing
  if (!cmd) return;
  // Run the command
  cmd.run(client, interaction);
};
