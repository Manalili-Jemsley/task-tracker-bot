import { config } from "dotenv"
import { REST, Routes } from "discord.js"
import commandList from "./commands/index.js"

config()

const getEnvironmentVariable = (variable?: string) => {
	return variable || ""
}

const token = getEnvironmentVariable(process.env.TOKEN)
const clientId = getEnvironmentVariable(process.env.APP_ID)
const guildId = getEnvironmentVariable(process.env.GUILD_ID)

const rest = new REST().setToken(token);

(async () => {
	try {
    const commands = commandList.map(command => command.data.toJSON())

		console.log(`Started refreshing ${commandList.length} application (/) commands.`);
    
		await rest.put(
			Routes.applicationGuildCommands(clientId, guildId),
			{ body: commands },
		);

		console.log(`Successfully reloaded ${commandList.length} application (/) commands.`);
	} catch (error) {
		console.error(error);
	}
})();