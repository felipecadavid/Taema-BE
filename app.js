require("dotenv").config();
const express = require("express");
const expressConfig = require("./config/express");
const routesConfig = require("./config/routes");
const connectDB = require("./database");
const cors = require('cors');

const app = express();
connectDB();

app.use(cors());

expressConfig(app);
routesConfig(app);

function startServer() {
  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => console.log("Server running on port", PORT));
}

setImmediate(startServer);

module.exports = app;
