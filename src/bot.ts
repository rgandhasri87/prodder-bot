import { Client, Events, GatewayIntentBits } from "discord.js";

// how to make this import?
const { DISCORD_BOT_TOKEN } = require("../bot-config.json");

const client = new Client({ intents: [GatewayIntentBits.Guilds]});

client.once(Events.ClientReady, (readyClient: Client<true>) => {
    console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

client.login(DISCORD_BOT_TOKEN)


