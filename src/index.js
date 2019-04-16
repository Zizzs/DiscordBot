const Discord = require("discord.js");
const client = new Discord.Client();

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
    primaryCommand === "ping" &&
    receivedMessage.channel.id === "567821555598360584"
  ) {
    receivedMessage.channel.send("Pong");
  } else if (
    primaryCommand === "multiply" &&
    receivedMessage.channel.id === "567821555598360584"
  ) {
    multiplyCommand(arguments, receivedMessage);
  }
}

function multiplyCommand(arguments, receivedMessage) {
  if (arguments.length < 2) {
    receivedMessage.channel.send(
      "Not enough values to multiply. Try `!multiply 2 4 10` or `!multiply 5.2 7`"
    );
    return;
  }
  let product = 1;
  arguments.forEach(value => {
    product = product * parseFloat(value);
  });
  receivedMessage.channel.send(
    "The product of " +
      arguments +
      " multiplied together is: " +
      product.toString()
  );
}
bot_secret_token = "XXXXX";

client.login(bot_secret_token);
