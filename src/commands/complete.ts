import { ChatInputCommandInteraction, inlineCode, MessageFlags, SlashCommandBuilder, userMention } from "discord.js"
import prisma from "../lib/prisma.js"

const execute = async (interaction: ChatInputCommandInteraction) => {
  const taskId = interaction.options.getInteger("id")
  if (!taskId || !interaction.member) return
  
  try {
    const foundTask = await prisma.task.findFirst({
      where: {
        id: taskId,
        userId: parseInt(interaction.member.user.id)
      }
    })

    if (!foundTask) return await interaction.reply({
      content: `There is no task assigned to you with the id ${inlineCode(taskId.toString())}.`,
      flags: MessageFlags.Ephemeral
    })

    await prisma.task.delete({
      where: {
        id: taskId,
        userId: parseInt(interaction.member.user.id)
      }
    })

    await interaction.reply(`Task ${inlineCode(`[${taskId.toString()}] ${foundTask.name}`)} has been marked as complete by ${userMention(interaction.member.user.id)}.`)
  } catch (err) {
    console.error(err)
    await interaction.reply({ content: "An error occurred. Task not completed.", flags: MessageFlags.Ephemeral })
  }
}

export default {
  name: "complete",
  data: new SlashCommandBuilder()
    .setName("complete")
    .setDescription("Completes a task assigned to you.")
  .addIntegerOption(option =>
    option
      .setName("id")
      .setDescription("The id of the task to complete")
      .setRequired(true)
  ),
  execute
}