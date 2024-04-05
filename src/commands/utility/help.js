const { SlashCommandBuilder, Client, Embed } = require("discord.js");
const { EmbedBuilder } = require("discord.js");
require("dotenv").config();

https: module.exports = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Opens up the help channel."),
  async execute(interaction) {
    const embedhelp = new EmbedBuilder()
      .setAuthor({
        name: "CyberDeltoid Help",
        iconURL: "https://i.postimg.cc/pVzkTZR1/edited.png",
      })
      .setDescription("This is the help channel.")
      .setColor(0x97e6ef)
      .addFields({ name: "/nth-prime", value: "Returns the nth prime number." })
      .addFields({ name: "/oeis", value: "Returns the OEIS sequence." })
      .addFields({ name: "/ping", value: " ( ͡° ͜ʖ ͡°)" })
      .addFields({ name: "/help", value: "Shows this command list." })
      .addFields({ name: "/cat", value: "Sends cute cats." });
    await interaction.reply({ embeds: [embedhelp] });
  },
};
