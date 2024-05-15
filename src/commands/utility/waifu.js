const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { request } = require("undici");
function rand(max) {
  return Math.floor(Math.random() * max);
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName("waifu")
    .addStringOption((option) => {
      return option
        .setName("tags")
        .setDescription(
          "Input the tags. Make sure to add a comma between each."
        )
        .setRequired(true);
    })
    .setDescription("Search for a waifu!"),
  async execute(interaction) {
    const tag = interaction.options.get("tags").value;
    try {
      const req = await request(
        `https://www.zerochan.net/${tag}?p=1&l=500&json`
      );
      const waifu = await req.body.json();
      const randomEntry = rand(waifu.items.length);
      const embed = new EmbedBuilder()
        .setAuthor({
          name: "Zerochan",
          iconURL:
            "https://www.google.com/s2/favicons?sz=256&domain_url=https%3A%2F%2Fwww.zerochan.net%2F",
        })
        .setTitle(waifu.items[randomEntry].tag)
        .setURL(`https://www.zerochan.net/${waifu.items[randomEntry].id}`)
        .setImage(waifu.items[randomEntry].thumbnail)
        .setTimestamp()
        .setFooter({
          text: "CyberDeltoid",
          iconURL: "https://i.postimg.cc/pVzkTZR1/edited.png",
        });
      await interaction.reply({ embeds: [embed] });
    } catch (err) {
      await interaction.reply("No result found.");
    }
  },
};
