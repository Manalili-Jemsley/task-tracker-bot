import { BaseInteraction, Client, Events, GatewayIntentBits, MessageFlags } from "discord.js"
import { config } from "dotenv"
import commandList from "./commands/list.js"

config()
const token = process.env.TOKEN
const client = new Client({ intents: [GatewayIntentBits.Guilds] })

client.once(Events.ClientReady, readyClient => {
	console.log(`Ready! Logged in as ${readyClient.user.tag}`)
});

client.on(Events.InteractionCreate, async (interaction: BaseInteraction) => {
	if (!interaction.isChatInputCommand()) return;

  const command = commandList.find(command => command.name === interaction.commandName)
  if (!command) return

  try {
    await command.execute(interaction)
  } catch (err) {
    console.error(err)
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ 
        content: 'There was an error while executing this command!', 
        flags: MessageFlags.Ephemeral 
      })

      return
		}
    
    await interaction.reply({ 
      content: 'There was an error while executing this command!', 
      flags: MessageFlags.Ephemeral 
    })
  }
});

client.login(token);