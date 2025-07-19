import { SlashCommandBuilder } from "discord.js";
import pingHandler from "./handlers/ping"

export default [
  {
    name: "ping",
    data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies back with Pong!"),
    execute: pingHandler
  }
]