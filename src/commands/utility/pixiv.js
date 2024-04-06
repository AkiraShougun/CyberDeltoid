const { SlashCommandBuilder } = require("discord.js");
const Pixiv = require("@ibaraki-douji/pixivts");
const pixiv = new Pixiv.Pixiv();
module.exports = {
  data: new SlashCommandBuilder()
    .setName("helltaker")
    .setDescription("Random pixiv image!"),
  async execute(interaction) {
    await pixiv
      .getIllustsByTag("helltaker", { mode: "safe", page: 100 })
      .then((res) => {
        const size = Object.keys(res).length;
        const random = Math.floor(Math.random() * size);
        interaction.reply(
          `https://www.pixiv.net/en/artworks/${res[random].id}`
        );
      });
  },
};
