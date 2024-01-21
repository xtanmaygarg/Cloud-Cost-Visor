const express = require("express");
const app = express();
const cors = require("cors");
const port = 3000;

const costRouter = require("./routes/cost");
const alertRouter = require("./routes/alerts");
const actionRouter = require("./routes/actions");
const authRouter = require("./routes/auth");

app.options(
  "*",
  cors({ origin: "http://localhost:3001", optionsSuccessStatus: 200 })
);

app.use(cors({ origin: "http://localhost:3001", optionsSuccessStatus: 200 }));

app.use(express.json());
app.get("/", (req, res) => {
  let data = { name: "Hello Boss!" };
  res.json(data);
});

app.use("/cost", costRouter);
app.use("/alerts", alertRouter);
app.use("/actions", actionRouter);
app.use("/auth", authRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
