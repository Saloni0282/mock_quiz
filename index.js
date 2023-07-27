const express = require("express");
const connection = require("./config/db");
const {UserRouter} = require("./routes/user.routes");
const {QuizRouter} =  require("./routes/quiz.routes")

const cors = require("cors");
require("dotenv").config()

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.status(200).send("Welcome to Quiz Maker");
});

app.use("/user",UserRouter);

app.use("/quiz",QuizRouter);


app.listen(8000, async () => {
    console.log(`Server runs at ${process.env.PORT}`);
    try {
      await connection
      console.log("Connected to DB Successfully");
    } catch (err) {
        console.log(err)
      console.log("Not connected to DB");
    }
  });
