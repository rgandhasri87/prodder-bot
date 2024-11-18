// Made by following the discord.js documentation/guide but with adjustments for typescript.

import * as fs from "node:fs";
import * as path from "node:path";

import { Client, Collection, Events, GatewayIntentBits } from "discord.js";
import type { CommandInteraction } from "discord.js";

// how to make this import?
const { DISCORD_BOT_TOKEN } = require("../bot-config.json");

const commandFoldersPath = path.join(__dirname, "commands");
const commandFolders = fs.readdirSync(commandFoldersPath);


// check what interface is
interface Command {
    name: string;
    description: string;
    execute: (interaction: CommandInteraction) => Promise<void>;
}

// original
// const client = new Client({ intents: [GatewayIntentBits.Guilds]});

// casting for prototype. Look into custom subclass...
// last note before logging off: just do the subclass anyway in its own file
// see https://stackoverflow.com/questions/69500556/discord-js-guide-property-commands-does-not-exist-on-type-clientboolean
const client = new Client({
    intents: [GatewayIntentBits.Guilds],
}) as Client & { commands: Collection<string, Command> };


for (const folder of commandFolders) {
    const commandsPath = path.join(commandFoldersPath, folder);
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(".ts"));

    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);
        if ("data" in command && "execute" in command) {
            client.commands.set(command.data.name, command)
        } else {
            console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`)
        }
    }
}


client.once(Events.ClientReady, (readyClient: Client<true>) => {
    console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});


client.on(Events.InteractionCreate, (interaction) => {
    if (!interaction.isChatInputCommand) return;
    console.log(interaction);

    const command = client.commands.get(interaction.commandName)    // here the discord.js docs said to use "interaction.client.commands.get". Need to see what that is...
})

// looks like this should always be at the end?
client.login(DISCORD_BOT_TOKEN);


