// Import required modules
let express = require("express");
let bodyParser = require("body-parser");
let mongoose = require("mongoose");
let app = express();

// Import routes
let apiRoutes = require("./api-routes");
// Configure bodyparser to handle post requests
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

// To allow request from any origin
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "HEAD, OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  next();
});

const url =
  process.env.MONGODB_URI ||
  "mongodb+srv://dbUser:qRHREWRi7vJdTdjs@cluster0.ec17n.gcp.mongodb.net/CS3219-Assignment?retryWrites=true&w=majority";

// Connect to Mongoose and set connection variable
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
var db = mongoose.connection;

// Validation check to see whether successfully connected to Mongodb
if (!db) console.log("Error connecting db");
else console.log("Db connected successfully");

// Setup server port
var port = process.env.PORT || 8080;

// Send message for default URL
app.get("/", (req, res) =>
  res.status(200).send("Please key in /api/ to use the application").end()
);

// Use Api routes in the App
app.use("/api", apiRoutes);

// To double check if the application running on the correct port 8080
app.listen(port, function () {
  console.log("Running application on port " + port);
});

// Export our app for testing purpose
module.exports = app;
