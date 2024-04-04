const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { request } = require("undici");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("oeis")
    .addStringOption((option) => {
      return option
        .setName("number")
        .setDescription("Returns the OEIS sequence")
        .setRequired(true);
    })
    .setDescription("Display oeis info."),
  async execute(interaction) {
    const oeis_number = interaction.options.get("number").value;
    const oeisResult = await request(
      `https://oeis.org/search?q=${oeis_number}&fmt=json`
    );
    const file = await oeisResult.body.json();
    const embedoeis = new EmbedBuilder()
      .setAuthor({
        name: "On-Line Encyclopedia of Integer Sequences",
        iconURL: "https://oeis.org/oeis_logo.png",
        url: "https://oeis.org/",
      })
      .setTitle(`${file.results[0].name}`)
      .setURL(`https://oeis.org/A${file.results[0].number}`)
      .setDescription(`${file.results[0].data}`)
      .setColor(0x97e6ef);
    if (file.results !== null) {
      interaction.reply({ embeds: [embedoeis] });
    } else {
      interaction.reply("The given sequence was not found.");
    }
  },
};
