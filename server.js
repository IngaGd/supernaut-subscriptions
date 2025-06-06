const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use("/", require("./routes/accessCheck"));
app.use("/", require("./routes/webhook"));

app.listen(PORT, () => {
  console.log(`Server is started on port: ${PORT}`);
});
