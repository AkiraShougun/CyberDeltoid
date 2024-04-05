const { SlashCommandBuilder } = require("discord.js");
const nthPrime = require("../../functionality/prime");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("nth-prime")
    .addIntegerOption((option) => {
      return option
        .setName("nth-prime")
        .setMaxValue(664579)
        .setDescription("Returns the nth prime number")
        .setRequired(true);
    })
    .setDescription("Returns the nth prime number"),
  async execute(interaction) {
    const nth_prime = interaction.options.get("nth-prime").value;
    await interaction.reply(
      `The ${nth_prime}th prime number is ${await nthPrime(nth_prime)}`
    );
  },
};
