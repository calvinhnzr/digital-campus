const { connect } = require('./db')
const redisPubSub = require('./redisPubSub')
const express = require("express");
const cors = require('cors');

const app = express();


app.use(cors({
  origin: ['http://localhost:3000', 'https://my-app.com'],
}));

// ROUTES IMPORT
const roomRoutes = require('./routes/roomRoutes')
const assetsRoutes = require('./routes/assetsRoutes.js')
const scheduleRoutes = require('./routes/schedulesRoutes')
const campusRoutes = require('./routes/campusRoutes')

// ROUTES
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use('/api/rooms', roomRoutes)
app.use('/api/assets', assetsRoutes)
app.use('/api/schedules', scheduleRoutes)
app.use('/api/campus', campusRoutes)

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

connect()
redisPubSub.startRedis()