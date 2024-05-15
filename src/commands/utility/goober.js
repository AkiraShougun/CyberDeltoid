const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("goober")
    .setDescription("Goober.")
    .addUserOption((option) => {
      return option
        .setName("user")
        .setDescription("Select a user.")
        .setRequired(true);
    }),
  async execute(interaction) {
    const user = interaction.options.getUser("user");
    await interaction.reply(
      `⚠️ Goober - ${user}\nhttps://i.postimg.cc/xdVFJ2RY/goober.png`
    );
  },
};
