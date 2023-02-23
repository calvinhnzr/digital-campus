require("dotenv").config();

const { generate, generateHTML } = require("./helpers/generate");

const path = require("path");

// express
const express = require("express");
const app = express();
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

// example display: http://localhost:8001/display/campus/gummersbach/rooms/3216
// example display as html: http://localhost:8001/display/campus/gummersbach/rooms/3216?type=html
// example timetable: http://localhost:8001/timetable/campus/gummersbach/rooms/3216
// room display endpoint
app.get("/:view/campus/:campus/rooms/:room", async (req, res) => {
  const { campus: campusParam, room: roomParam, view } = req.params;

  console.log("campusParam: ", campusParam);
  console.log("roomParam: ", roomParam);
  console.log("view: ", view);

  if (!campusParam || !roomParam || !view) {
    return res.status(400).json({ error: "Missing parameters" });
  }

  if (view !== "display" && view !== "timetable") {
    return res.status(400).json({ error: "Invalid view" });
  }

  const { type } = req.query;
  if (type === "html") {
    const html = await generateHTML(campusParam, roomParam, view);
    return res.status(200).send(html);
  }

  const result = await generate(campusParam, roomParam, view);

  if (result.error) {
    return res.status(500).json({ error: result.error });
  } else {
    return res.status(200).sendFile(path.join(__dirname, `../${view}.bmp`));
  }
});

const PORT = process.env.PORT || 8001;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
