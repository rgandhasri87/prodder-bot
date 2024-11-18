// see difference between CommandInteraction, Interaction
import { SlashCommandBuilder } from "discord.js";
import type { CommandInteraction } from "discord.js";

// difference between module.exports and export keyword?
// what happens when I have multiple exports?
export const data = new SlashCommandBuilder()
        .setName("gaditha")
        .setDescription("Replies with a gaditha themed message!");
    

export async function execute(interaction: CommandInteraction) {
    await interaction.reply("They call you the \"Gaditha of VDC\"!");
}