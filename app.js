const express = require("express");
const OpenAI = require("openai");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const workoutRoutes = require("./routes/workoutRoutes");

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// middleware
app.use(bodyParser.json());
app.use("/api/workouts", workoutRoutes);

app.use((req, res) => {
  res.status(404).json({ error: "Route does not exist" });
});

app.listen(port, () => {
  `Server is listening on port ${port}`;
});
