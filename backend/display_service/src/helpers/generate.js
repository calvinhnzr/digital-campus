require("dotenv").config();

const ejs = require("ejs");
const puppeteer = require("puppeteer");
const Jimp = require("jimp");

// generate html from ejs template
const generateHTML = async (campusParam, roomParam) => {
  // get room information
  const roomResponse = await fetch(`${process.env.DATA_SERVICE_URL}/api/campus/${campusParam}/rooms`);

  if (!roomResponse.ok) {
    return { error: "Campus not found" };
  }

  const roomData = await roomResponse.json();

  let roomInfo;
  roomInfo = roomData.find((room) => room.number === roomParam);

  if (!roomInfo) {
    return { error: "Room not found" };
  }

  // get timetable information
  const timetableResponse = await fetch(`${process.env.DATA_SERVICE_URL}/api/timetables`);
  const timetableData = await timetableResponse.json();

  const tCampus = timetableData.find((campus) => campus.campus.toLowerCase() === campusParam.toLowerCase());
  const timetable = tCampus.rooms.find((room) => room.roomNo.toLowerCase() === roomParam.toLowerCase());

  if (!timetable) {
    return { error: "Timetable not found" };
  }

  const countResponse = await fetch(`${process.env.AUTH_SERVICE_URL}/api/count?room=${roomParam}`);
  const countData = await countResponse.json();

  // render ejs template as html
  return new Promise((resolve, reject) => {
    ejs.renderFile(__dirname + "/../views/pages/index.ejs", { timetable, roomInfo, count: countData }, (err, html) => {
      if (err) {
        console.log(err);
        reject({ error: "Error rendering EJS file" });
      }

      resolve(html);
    });
  });
};

// https://dev.to/cloudx/how-to-use-puppeteer-inside-a-docker-container-568c
// generate image from html
const generateImage = async (html) => {
  try {
    const browser = await puppeteer.launch({ executablePath: "/usr/bin/google-chrome", args: ["--no-sandbox"] });
    const page = await browser.newPage();
    await page.setContent(html);
    await page.setViewport({ width: 800, height: 600 });
    // await page.setViewport({ width: 1872, height: 1404 });
    const file = await page.screenshot({ path: "index.png", fullPage: true });
    await browser.close();

    return file;
  } catch (error) {
    console.log(error);
    return { error };
  }
};

// https://coderrocketfuel.com/article/convert-between-jpeg-and-bmp-files-using-node-js-and-jimp#install-jimp-npm-package
// convert image to bmp
const convertImage = async () => {
  return new Promise((resolve, reject) => {
    Jimp.read("index.png", (err, image) => {
      if (err) {
        console.log(err);
        reject({ error: "Error reading image" });
      }

      image.write("index.bmp", (error) => {
        if (error) {
          console.log(error);
          reject({ error: "Error writing image" });
        }

        resolve(image);
      });
    });
  });
};

const generate = async (campus, room) => {
  const html = await generateHTML(campus, room);
  if (html.error) {
    return html;
  }

  const image = await generateImage(html);
  if (image.error) {
    return image;
  }

  const result = await convertImage();

  return result;
};

module.exports = { generate, generateHTML };
