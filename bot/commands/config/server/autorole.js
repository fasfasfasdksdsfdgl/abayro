const { Command } = require('discord-akairo');
const { emojis } = require('../../../struct/bot');
const { RichEmbed } = require('discord.js');


class AutoRoleCommand extends Command {
	constructor() {
		super('autorole', {
			aliases: ['autorole'],
			cooldown: 3000,
			ratelimit: 5,
			category: 'config',
			channelRestriction: 'guild',
			clientPermissions: ['MANAGE_GUILD'],
			userPermissions: ['MANAGE_GUILD'],
			description: {
				content: 'To turn/set server autorole',
				usage: 'turn | set',
				examples: ['autorole turn on', 'autorole setrole [role]']
			},
			args: [{
				id: 'autor',
				type: 'string'
			},
			{
			    id: 'margs',
			    match: 'word',
			    index: 1
			},
			{
				id: 'role',
				type: 'role',
				index: 1
			}]
		});
	}

	async exec(message, {
		autor, margs, role
	}) {
		if (!autor) {
			 await message.channel.send(`${emojis.info}**| ${message.author.username},** Current **autorole settings** for **${message.guild.name}** is:`);
			message.channel.send(
				new RichEmbed()
				 .setColor('#307FFF')
				 .setAuthor(message.guild.name, message.guild.iconURL)
				 .addField('Status:', `**${this.client.settings.get(message.guild.id, 'autorole', 'off').replace('off', 'OFF `(not active)`').replace('on', 'ON `(active)`')}**`, true)
				 .addField('Autorole:', `**${this.client.settings.get(message.guild.id, 'autorolest', 'No autorole set')}**

__**[Autorole usage:](https://abayro.xyz/commands/autorole/usage)**__
\`\`\`md
> ━━━━━━━━━━━━━━━━━━━━━
# Use ${this.client.commandHandler.prefix(message)}autorole turn [on/off]
* To turn on/off the autorole status
# Use ${this.client.commandHandler.prefix(message)}autorole setrole [roleName/roleID/roleMention]
* To select the autorole.
> ━━━━━━━━━━━━━━━━━━━━━
\`\`\``, true)
				 .setFooter(`Requested by ${message.author.username}`, message.author.avatarURL)
				 .setTimestamp()
			);
		} else if (autor === 'turn') {
			if (!margs) return message.channel.send(`${emojis.no}**| ${message.author.username},** Please choose **on** or **off** to **set** the **status**.`);
			if (margs === 'on') {
				this.client.settings.set(message.guild.id, 'autorole', 'on');
				message.channel.send(`${emojis.yes}**| ${message.author.username},** **Autorole** has been **activated**.`);
			} else if (margs === 'off') {
				this.client.settings.set(message.guild.id, 'autorole', 'off');
				message.channel.send(`${emojis.yes}**| ${message.author.username},** **Autorole** has been **deactivated**.`);
			}
		} else if (autor === 'setrole') {
			if (!role) return message.channel.send(`${emojis.no}**| ${message.author.username},** Please **enter** a **role** name.`);
			this.client.settings.set(message.guild.id, 'autorolest', role.name);
			message.channel.send(`${emojis.yes}**| ${message.author.username},** The **autorole** has been changed to **${role.name}**`);
		}
	}
}


module.exports = AutoRoleCommand;
