const { connect } = require('./db')
const express = require("express");
const cors = require('cors');

const app = express();


app.use(cors({
  origin: ['http://localhost:3000', 'https://my-app.com'],
}));

// ROUTES IMPORT
const roomRoutes = require('./routes/roomRoutes')

// ROUTES
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use('/api/rooms', roomRoutes)

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

connect()