import { ChatInputCommandInteraction, SlashCommandBuilder, userMention, inlineCode } from "discord.js"

const execute = async (interaction: ChatInputCommandInteraction) => {
  const task = interaction.options.getString("task")
  const user = interaction.options.getUser("user")

  if (!task || !user) return
  
  await interaction.reply(`Task ${inlineCode(task)} assigned to ${userMention(user.id)}`)
}

export default {
  name: "add",
  data: new SlashCommandBuilder()
    .setName("add")
    .setDescription("Adds a task for a user.")
    .addStringOption(option =>
		option
      .setName("task")
			.setDescription("The task to be added.")
      .setRequired(true)
    )
  .addUserOption(option =>
    option
      .setName("user")
      .setDescription("The user to assign the task to.")
      .setRequired(true)
  ),
  execute,
}