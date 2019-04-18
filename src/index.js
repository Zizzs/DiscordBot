const { Client, Attachment } = require("discord.js");
let mongoose = require("mongoose");

//Import Commands
const showAllCommands = require("../src/commands/commands");
const multiplyCommand = require("../src/commands/multiply");
const ripCommand = require("../src/commands/rip");
const pingCommand = require("../src/commands/pingPong");
const eventCommands = require("../src/commands/events");

//Import Config
const config = require("../src/config");

//Start new Client
const client = new Client();

//Bots Channel
const botChannel = client.channels.get("567821555598360584");

//Connects the bot
client.on("ready", () => {
  console.log("Connected as " + client.user.tag);

  //List all servers
  console.log("Servers:");
  client.guilds.forEach(guild => {
    console.log(" - " + guild.name);

    // List all channels
    guild.channels.forEach(channel => {
      console.log(` -- ${channel.name} (${channel.type}) - ${channel.id}`);
    });

    client.user.setActivity("with JavaScript");
  });
});

//Run Bot code on message
client.on("message", receivedMessage => {
  //Prevents the bot from responding to its own messages
  if (receivedMessage.author == client.user) {
    return;
  }

  //If the bot reads a ! command, it runs the function.
  if (receivedMessage.content.startsWith("!")) {
    processCommand(receivedMessage);
  }
});

client.on("guildMemberAdd", member => {
  const channel = member.guild.channels.find(ch => ch.name === "general");
  if (!channel) return;
  channel.send(`Welcome to the server, ${member}`);
});

client.on("error", error => {
  console.log(error);
});

function processCommand(receivedMessage) {
  let fullCommand = receivedMessage.content.substr(1); // Remove the leading exclamation mark
  let splitCommand = fullCommand.split(" "); // Split the message up in to pieces for each space
  let primaryCommand = splitCommand[0]; // The first word directly after the exclamation is the command
  let arguments = splitCommand.slice(1); // All other words are arguments/parameters/options for the command

  console.log("Command received: " + primaryCommand);
  console.log("Arguments: " + arguments); // There may not be any arguments

  if (
    primaryCommand === "commands" &&
    receivedMessage.channel.id === "568089592217993227"
  ) {
    showAllCommands(receivedMessage);
  } else if (
    primaryCommand === "multiply" &&
    receivedMessage.channel.id === "568089592217993227"
  ) {
    multiplyCommand(arguments, receivedMessage);
  } else if (primaryCommand === "rip") {
    ripCommand(receivedMessage);
  } else if (
    primaryCommand === "ping" &&
    receivedMessage.channel.id === "568089592217993227"
  ) {
    pingCommand(receivedMessage);
  } else if (
    primaryCommand === "event" &&
    arguments[0] === "add" &&
    receivedMessage.channel.id === "568089592217993227"
  ) {
    eventCommands.eventAddCommand(arguments[1], arguments[2]);
  } else if (
    primaryCommand === "event" &&
    arguments[0] === "showAll" &&
    receivedMessage.channel.id === "568089592217993227"
  ) {
    eventCommands.eventShowAllCommand(receivedMessage);
  } else if (
    primaryCommand === "event" &&
    arguments[0] === "help" &&
    receivedMessage.channel.id === "568089592217993227"
  ) {
    eventCommands.eventHelpCommand(receivedMessage);
  }
}

bot_secret_token = config.botToken;

client.login(bot_secret_token);
