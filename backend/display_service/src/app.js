const { generate, generateHTML } = require("./helpers/generate");

const path = require("path");

// redis
const redisPubSub = require("./helpers/redisPubSub");

// express
const express = require("express");
const app = express();
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

// example: http://localhost:8001/display/campus/gummersbach/rooms/3216
// room display endpoint
app.get("/display/campus/:campus/rooms/:room", async (req, res) => {
  const campusParam = req.params.campus;
  const roomParam = req.params.room;

  const { type } = req.query;
  if (type === "html") {
    const html = await generateHTML(campusParam, roomParam);
    return res.status(200).send(html);
  }

  const result = await generate(campusParam, roomParam);

  if (result.error) {
    return res.status(500).send(result.error);
  } else {
    return res.status(200).sendFile(path.join(__dirname, "../index.bmp"));
  }
});

const PORT = process.env.PORT || 8001;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

redisPubSub.startRedis();
