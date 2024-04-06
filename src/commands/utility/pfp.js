const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("pfp")
    .setDescription("Displays the profile picture of a user.")
    .addUserOption((option) => {
      return option
        .setName("user")
        .setDescription("Select a user.")
        .setRequired(true);
    }),
  async execute(interaction) {
    const user = interaction.options.getUser("user");
    const avatar = user.displayAvatarURL({ dynamic: true, size: 1024 });
    interaction.reply(avatar);
  },
};
