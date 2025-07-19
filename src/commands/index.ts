import { SlashCommandBuilder } from "discord.js";
import commandList from "./list";

export default commandList.map(command => {
  const data = new SlashCommandBuilder()
    .setName(command.name)
    .setDescription(command.description)
  
  const execute = command.execute

  return {
    data,
    execute
  }
})