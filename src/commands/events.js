let mongoose = require("mongoose");
const eventSchema = require("../schema/event");
const config = require("../config");

const eventAddCommand = (name, link) => {
  mongoose.connect(config.url, { useNewUrlParser: true });

  let db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error:"));
  db.once("open", function() {
    console.log("Successfully connected to MongoDB.");
    let NewEvent = mongoose.model("NewEvents", eventSchema);
    let newEvent = new NewEvent({
      title: name,
      url: link,
      type: "Events"
    });
    console.log(newEvent);
    newEvent.save();
  });
};

const eventHelpCommand = recievedMessage => {
  recievedMessage.channel.send(
    `Event Commands:
    !event add eventName eventURL - Adds an event to the database.
    !event showAll - Shows all events that are in the database.`
  );
};

async function eventShowAllCommand(recievedMessage) {
  mongoose.connect(config.url, { useNewUrlParser: true });

  let db = mongoose.connection;
  console.log("DB Made");
  db.on("error", console.error.bind(console, "connection error:"));
  db.once("open", function() {
    console.log("Successfully connected to MongoDB.");
    let NewEvent = mongoose.model("NewEvents", eventSchema);
    NewEvent.find({}, (err, events) => {
      console.log(events);
      for (let event of events) {
        recievedMessage.channel.send(`
        Event Title: ${event.title}
        Event URL: ${event.url}`);
      }
    });
  });
}

module.exports.eventAddCommand = eventAddCommand;
module.exports.eventShowAllCommand = eventShowAllCommand;
module.exports.eventHelpCommand = eventHelpCommand;
