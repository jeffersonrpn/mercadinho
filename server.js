const express = require("express");
const forceSsl = require('force-ssl-heroku');
const path = require("path");

const app = express();
app.use(forceSsl);

app.use(express.static("dist"));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "dist", "index.html"));
});

const port = process.env.PORT || 8080;

app.listen(port, () => console.log(`Server running on ${port}`));
