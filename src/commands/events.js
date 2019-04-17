let mongoose = require("mongoose");
const eventSchema = require("../schema/event");
const config = require("../config");

const eventAddCommand = (name, link) => {
  mongoose.connect(config.url, { useNewUrlParser: true });

  let db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error:"));
  db.once("open", function() {
    let NewEvent = mongoose.model("NewEvent", eventSchema);
    let newEvent = new NewEvent({
      title: name,
      url: link,
      type: "Events"
    });
    console.log(newEvent);
    newEvent.save();
  });
  mongoose.connection.close();
};

async function eventShowAllCommand(message) {
  let db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error:"));
  db.once("open", function(callback) {
    console.log("Successfully connected to MongoDB.");
    let NewEvent = mongoose.model("newevents", eventSchema);
    let query = NewEvent.find({});
    query.exec(function(err, events) {
      if (err) return handleError(err);
      console.log(events);
    });
  });

  //message.channel.send(eventsArray);
}

module.exports.eventAddCommand = eventAddCommand;
module.exports.eventShowAllCommand = eventShowAllCommand;
