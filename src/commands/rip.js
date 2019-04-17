const { Attachment } = require("discord.js");

const ripCommand = message => {
  const attachment = new Attachment("https://i.imgur.com/w3duR07.png");
  message.channel.send(attachment);
};

module.exports = ripCommand;
