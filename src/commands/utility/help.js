const { SlashCommandBuilder } = require("discord.js");
const { EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Opens up the help channel."),
  async execute(interaction) {
    const embedhelp = new EmbedBuilder()
      .setTitle("Help")
      .setDescription("This is the help channel")
      .setColor(0x97e6ef)
      .addFields({ name: "Field title", value: "Random BS Go" });
    interaction.reply({ embeds: [embedhelp] });
  },
};
