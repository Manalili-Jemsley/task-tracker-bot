import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js"

const execute = async (interaction: ChatInputCommandInteraction) => {
  await interaction.reply("Pong!")
}

export default {
  name: "ping",
  data: new SlashCommandBuilder()
  .setName("ping")
  .setDescription("Replies back with Pong!"),
  execute,
}