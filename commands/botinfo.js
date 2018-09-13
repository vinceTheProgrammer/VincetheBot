const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  let bicon = bot.user.displayAvatarURL;
  let botembed = new Discord.RichEmbed()
  .setDescription("Bot Info")
  .setColor("#b9b665")
  .setThumbnail(bicon)
  .addField("Bot Name", bot.user.username)
  .addField("Created On", bot.user.createdAt)
  .addField("Description", "Just a stupid bot.");

  return message.channel.send(botembed);
}

module.exports.help = {
  name: "botinfo"
}
