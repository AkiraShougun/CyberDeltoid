import "dotenv/config";
import { REST, Routes, ApplicationCommandOptionType } from "discord.js";

const commands = [
  {
    name: "greet",
    description: "Replies with Greet!",
  },
  {
    name: "help",
    description: "Help command",
  },
  {
    name: "oeis",
    description: "Returns the oeis sequence.",
    options: [
      {
        name: "number",
        description: "The number to return",
        type: ApplicationCommandOptionType.String,
        required: true,
      },
    ],
  },
  {
    name: "prime",
    description: "Finds the nth-prime number",
    options: [
      {
        name: "nth-prime",
        description: "The nth-prime number",
        type: ApplicationCommandOptionType.Integer,
        required: true,
      },
    ],
  },
  {
    name: "add",
    description: "Adds two numbers",
    options: [
      {
        name: "first-number",
        description: "The first number",
        type: ApplicationCommandOptionType.Number,
        required: true,
      },
      {
        name: "second-number",
        description: "The second number",
        type: ApplicationCommandOptionType.Number,
        required: true,
      },
    ],
  },
];

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

try {
  console.log("Started refreshing application (/) commands.");

  await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), {
    body: commands,
  });

  console.log("Successfully reloaded application (/) commands.");
} catch (error) {
  console.error(error);
}
