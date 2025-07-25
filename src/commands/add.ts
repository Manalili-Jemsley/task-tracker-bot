import { ChatInputCommandInteraction, SlashCommandBuilder, userMention, inlineCode, MessageFlags } from "discord.js"
import prisma from "../lib/prisma.js"

const execute = async (interaction: ChatInputCommandInteraction) => {
  const task = interaction.options.getString("task") || ""
  const user = interaction.options.getUser("user")
  if (!task || !user) return

  try {
    const taskTrimmed = task.trim()
    await prisma.task.create({
      data: {
        name: taskTrimmed,
        userId: parseInt(user.id)
      }
    })
    await interaction.reply(`Task ${inlineCode(taskTrimmed)} assigned to ${userMention(user.id)}.`)
  } catch (err) {
    console.error(err)
    await interaction.reply({ content: "An error occurred. Task not added.", flags: MessageFlags.Ephemeral })
  }
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