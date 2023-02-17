require("dotenv").config();
const express = require("express");
const app = express();

const PORT = process.env.PORT || 3500;

app.use(express.json());

/* Routes middleware */
app.use("/api", require("./routes/route"));

app.listen(PORT, () =>
  console.log(`Server started on http://localhost:${PORT}`)
);
