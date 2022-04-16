const express = require("express");
const location = require("./routes/location");
const resources = require("./routes/resources");
const resourcesType = require("./routes/resourcesType");
const user = require("./routes/user");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const auth = require("./controllers/auth");
const private = require("./routes/private");
var cors = require("cors");

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const port = process.env.port || 5000;

app.use("/api/location", location);
app.use("/api/resource", resources);
app.use("/api/resourceType", resourcesType);
app.use("/api/user", user);
app.use("/api/private", private);
app.use("/api/auth", auth);

const mongouri =
  "mongodb+srv://fahadtariq92:master102@cluster0.kqc1m.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose.connect(mongouri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on("connected", () => {
  console.log("MongoDB Connected");
});
mongoose.connection.on("error", (err) => {
  console.log("error", err);
});

app.listen(port, () => {
  console.log(`App Listening on Port ${port}`);
});
