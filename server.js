require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Sridhar portfolio backend is running."
  });
});

app.post("/api/ai", (req, res) => {
  const message = typeof req.body.message === "string"
    ? req.body.message.trim()
    : "";

  if (!message) {
    return res.status(400).json({
      success: false,
      message: "Message is required."
    });
  }

  res.json({
    success: true,
    reply: "Demo backend received your message: " + message
  });
});

app.listen(PORT, () => {
  console.log(`Portfolio running at http://localhost:${PORT}`);
});
