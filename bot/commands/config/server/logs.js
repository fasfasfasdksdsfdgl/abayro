const { Command } = require('discord-akairo');
const { emojis } = require('../../../struct/bot');
const { RichEmbed } = require('discord.js');

class LogsCommand extends Command {
	constructor() {
		super('logs', {
			aliases: ['logs'],
			cooldown: 3000,
			ratelimit: 5,
			category: 'config',
			channelRestriction: 'guild',
			clientPermissions: ['MANAGE_GUILD'],
			userPermissions: ['MANAGE_GUILD'],
			description: {
				content: 'To turn on/off or set logs channel',
				usage: 'turn | channel',
				examples: ['logs turn on', 'logs channel #abayro-logs']
			},
			args: [{
				id: 'mhandler',
				type: 'string'
			},
			{
			    id: 'margs',
			    match: 'word',
			    index: 1
			}]
		});
	}

	async exec(message, {
		mhandler, margs
	}) {
		if (!mhandler) {
			await message.channel.send(`${emojis.info}**| ${message.author.username}**, Current **logs settings** for **${message.guild.name}** is:`);
			message.channel.send(
				new RichEmbed()
				 .setColor('#307FFF')
				 .setAuthor(message.guild.name, message.guild.iconURL)
				 .addField('Status:', `**${this.client.settings.get(message.guild.id, 'logs', 'off').replace('off', 'OFF `(not active)`').replace('on', 'ON `(active)`')}**`, true)
				 .addField('Logging channel:', `**<#${this.client.settings.get(message.guild.id, 'logschnl', '404')}>**

__**[ServerLogs usage:](https://abayro.xyz/commands/serverlogs/usage)**__
\`\`\`md
> ━━━━━━━━━━━━━━━━━━━━━
# Use ${this.client.commandHandler.prefix(message)}logs turn [on/off]
* To turn on/off the logs status
# Use ${this.client.commandHandler.prefix(message)}logs channel [#channel]
* To select the server logging channel.
> ━━━━━━━━━━━━━━━━━━━━━
\`\`\``)
				 .setFooter(`Requested by ${message.author.username}`, message.author.avatarURL)
				 .setTimestamp()
			);
		} else if (mhandler === 'turn') {
			if (!margs) return message.channel.send(`${emojis.no}**| ${message.author.username},** Please choose **on** or **off** to **set** the **status**.`);
			if (margs === 'on') {
				this.client.settings.set(message.guild.id, 'logs', 'on');
				message.channel.send(`${emojis.yes}**| ${message.author.username},** **Logs** has been **activated**.`);
			} else if (margs === 'off') {
				this.client.settings.set(message.guild.id, 'logs', 'on');
				message.channel.send(`${emojis.yes}**| ${message.author.username},** **Logs** has been **activated**.`);
			}
		} else if (mhandler === 'channel') {
			const channel = message.mentions.channels.first();
			if (!channel) return message.channel.send(`${emojis.no}**| ${message.author.username},** Please **mention** a channel`);
			this.client.settings.set(message.guild.id, 'logschnl', channel.id);
			message.channel.send(`${emojis.yes}**| ${message.author.username},** **Logs channel** has been set to **${channel}**.`);
		}
	}
}


module.exports = LogsCommand;
