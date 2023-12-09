const config = require("./config/config.js");
const app = require("./server/express.js");
const mongoose = require("mongoose");
const User = require("./server/models/user.model.js");
const Sneaker = require("./server/models/shoe.model.js")

mongoose.Promise = global.Promise;
mongoose.connect(config.mongoUri, {} )
   .then(() => {
  console.log("Connected to the database!");
  });

const database = mongoose.connection;

database.on(
    'error', () => {
        throw new Error(`Unable to connect to database: ${config.mongoUri}`);
    }
);


User.createCollection().then((collection) => {
    console.log("User collection is connected.");
});

Sneaker.createCollection().then((collection) => {
  console.log("Sneaker collection is connected.");
});

app.get('/', (req, res) => {
  res.json({message: "Welcome to SneakOut!"});
});

app.listen(config.port, (err) => {
  if (err) {
      console.log(err);
  }
  console.info("Server started on port %s.", config.port)
});