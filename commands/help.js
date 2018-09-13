const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  let botembed = new Discord.RichEmbed()
  .setDescription("Help")
  .setColor("#FFFF00")
  .addField("Info", "``serverinfo`` ``botinfo`` ``help`` ``coins``")
  .addField("Tools", "``report`` ``pay(wip)``")
  .addField("Fun", "``hello`` ``cat`` ``dog`` ``react``");

  return message.channel.send(botembed);
}

module.exports.help = {
  name: "help"
}
