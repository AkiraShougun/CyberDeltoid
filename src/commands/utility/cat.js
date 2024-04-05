const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { request } = require("undici");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("cat")
    .setDescription("Generates random cats."),
  async execute(interaction) {
    const catResult = await request(
      "https://api.thecatapi.com/v1/images/search"
    );
    const cat = await catResult.body.json();
    const catembed = new EmbedBuilder()
      .setColor("Random")
      .setTitle("Random Cat")
      .setDescription("Here is your random cat.")
      .setImage(`${cat[0].url}`);
    await interaction.reply({ embeds: [catembed] });
  },
};
