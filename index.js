const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client({disableEveryone: true});
bot.commands = new Discord.Collection();
let coins = require("./coins.json");
let statuses = ['>help', `${bot.guilds.size} servers`, 'you'];

fs.readdir("./commands/", (err, files) => {

  if(err) console.log;

  let jsfile = files.filter(f => f.split(".").pop() === "js")
  if(jsfile.length <= 0){
    console.log("couldn't find commands.");
    return;
  }

  jsfile.forEach((f, i) => {
    let props = require(`./commands/${f}`);
    console.log(`${f} loaded!`);
    bot.commands.set(props.help.name, props);
  });

});


bot.on("ready", async () => {
  console.log(`${bot.user.username} is online on ${bot.guilds.size} servers!`);
  setInterval(function() {
    
    let status = statuses[Math.floor(Math.random()*statuses.length)];
    
    bot.user.setActivity( `${status}`, {type: "WATCHING"});
    
    }, 10000)
  
  
  
});

bot.on("guildMemberAdd", async member => {
  console.log(`${member.id} joined the server.`);

  setTimeout(function(){let welcomechannel = member.guild.channels.find(`name`, "basic-chat");
  welcomechannel.send(`Ayy, welcome ${member}! :ok_hand:`);
}, 5000);

});

bot.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  if(!coins[message.author.id]){
    coins[message.author.id] = {
      coins: 0
    };
  }

  let coinAmt = Math.floor(Math.random() * 15) + 1;
  let baseAmt = Math.floor(Math.random() * 15) + 1;

  if(coinAmt === baseAmt){
    coins[message.author.id] = {
      coins: coins[message.author.id].coins + coinAmt
    };
  fs.writeFile("./coins.json", JSON.stringify(coins), (err) => {
    if (err) console.log(err)
  });
  let coinEmbed = new Discord.RichEmbed()
  .setAuthor(message.author.username)
  .setColor("#0000FF")
  .addField("💰", `${coinAmt} coins added!`);

  message.channel.send(coinEmbed).then(msg => {msg.delete(5000)});
  }

  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  let commandfile = bot.commands.get(cmd.slice(prefix.length));
  if(commandfile) commandfile.run(bot,message,args);

});


bot.login('NDg1MzA3Mzg5Njg0NDgyMDQ5.DnsAww.R03tjBHBrkCM7nTcgnqubXyzEi0');
