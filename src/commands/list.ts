import { ChatInputCommandInteraction, SlashCommandBuilder, userMention, inlineCode, MessageFlags, codeBlock } from "discord.js"
import prisma from "../lib/prisma.js"

const execute = async (interaction: ChatInputCommandInteraction) => {
  const user = interaction.options.getUser("user")
  if (!user) return

  try {
    const tasks = await prisma.task.findMany({
      where: {
        userId: parseInt(user.id)
      }
    })

    if (tasks.length === 0) return await interaction.reply(`${userMention(user.id)} has no tasks as of the moment.`)

    const lines = tasks.map(task => {
      const createdAt = new Date().toLocaleDateString()
      return `${createdAt}:       ${task.id}     ${task.name}`
    })
    lines.unshift("Date assigned    Id    Task")

    await interaction.reply(`Tasks assigned to: ${userMention(user.id)}: ${codeBlock(lines.join("\n"))}`)
  } catch (err) {
    console.error(err)
    await interaction.reply({ content: "An error occurred.", flags: MessageFlags.Ephemeral })
  }
}

export default {
  name: "list",
  data: new SlashCommandBuilder()
    .setName("list")
    .setDescription("Lists all tasks assigned to a user.")
  .addUserOption(option =>
    option
      .setName("user")
      .setDescription("The assignee of the tasks that are to be listed.")
      .setRequired(true)
  ),
  execute,
}