import "dotenv/config";
import { Client, IntentsBitField, EmbedBuilder } from "discord.js";
import "node-fetch";
import { nthPrime } from "./prime.js";

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.MessageContent,
  ],
});

client.on("ready", (c) => {
  console.log(`Logged in as ${c.user.tag}!`);
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "greet") {
    await interaction.reply("I don't do greets here");
  }

  if (interaction.commandName === "add") {
    const num1 = interaction.options.get("first-number").value;
    const num2 = interaction.options.get("second-number").value;

    await interaction.reply(`The sum is ${num1 + num2}`);
  }

  if (interaction.commandName === "help") {
    const embedhelp = new EmbedBuilder()
      .setTitle("Help")
      .setDescription("This is the help channel")
      .setColor(0x97e6ef)
      .addFields({ name: "Field title", value: "Random BS Go" });
    interaction.reply({ embeds: [embedhelp] });
  }

  if (interaction.commandName === "prime") {
    const nth_prime = interaction.options.get("nth-prime").value;
    interaction.reply(
      `The ${nth_prime}th prime number is ${nthPrime(nth_prime)}`
    );
  }
  if (interaction.commandName === "oeis") {
    const oeis_number = interaction.options.get("number").value;
    const file = await fetch(
      `https://oeis.org/search?q=${oeis_number}&fmt=json`
    ).then((res) => res.json());
    const embedoeis = new EmbedBuilder()
      .setTitle("The On-Line Encyclopedia of Integer Sequences")
      .setDescription("OEIS sequence")
      .setColor(0x97e6ef)
      .addFields({
        name: file.results[0].name,
        value: file.results[0].data,
      });
    if (file.results !== null) {
      interaction.reply({ embeds: [embedoeis] });
    } else {
      interaction.reply("The given sequence was not found.");
    }
  }
});

client.on("messageCreate", (m) => {
  if (m.author.bot) {
    return;
  }

  if (m.content === "Hello" || m.content === "hello") {
    m.reply("hewwwoo");
  }

  if (m.content === "What is the best field of math?") {
    m.reply("Obviously analytic number theory");
  }

  if (m.content === "Nice" || m.content === "nice") {
    m.reply("hell yeah");
  }
});

client.login(process.env.TOKEN);
