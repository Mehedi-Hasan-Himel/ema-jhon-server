const express = require("express");
const cors = require("cors");
const port = process.env.PORT || 5000;
const app = express();

// middleware
app.use(cors());
app.use(express.json());

app.get(`/`, (req, res) => {
  res.send(`Jhon is running and waiting for ema`);
});

app.listen(port, () => {
  console.log(`Jhon is running on port `, port);
});
