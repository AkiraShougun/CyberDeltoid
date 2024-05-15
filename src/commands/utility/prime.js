const { SlashCommandBuilder } = require("discord.js");
const { request } = require("undici");
// 1000000000
module.exports = {
  data: new SlashCommandBuilder()
    .setName("prime")
    .setDescription("Outputs the nth prime number!")
    .addSubcommand((subcommand) =>
      subcommand
        .setName("nth-prime")
        .setDescription("Returns a prime number at a specified position")
        .addIntegerOption((option) =>
          option
            .setName("position")
            .setDescription("Input the nth-position")
            .setRequired(true)
            .setMaxValue(1000000000)
            .setMinValue(2)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("prime-counting-function")
        .setDescription(
          "Returns quantity of prime numbers less than or equal a specified number"
        )
        .addIntegerOption((option) =>
          option
            .setName("input")
            .setDescription("Input for the prime counting function.")
            .setRequired(true)
        )
    ),
  async execute(interaction) {
    if (interaction.options.getSubcommand() === "nth-prime") {
      try {
        const pos = interaction.options.get("position").value;
        if (pos === 1) {
          await interaction.reply("The 1st prime number is 2");
        } else if (pos === 2) {
          await interaction.reply("The 2nd prime number is 3");
        } else if (pos === 3) {
          await interaction.reply("The 3rd prime number is 5");
        } else {
          const requestPrime = await request(`https://primes.org/f/${pos}`);
          const prime = await requestPrime.body.json();
          await interaction.reply(`The ${pos}th prime number is ${prime}`);
        }
      } catch {
        await interaction.reply("Error occured.");
      }
    }
    if (interaction.options.getSubcommand() === "prime-counting-function") {
      try {
        const inp = interaction.options.get("input").value;
        const requestPrime = await request(`https://primes.org/π/${inp}`);
        const num = await requestPrime.body.json();
        await interaction.reply(`π(${inp})=${num}`);
      } catch {
        await interaction.reply("Error occured.");
      }
    }
  },
};
