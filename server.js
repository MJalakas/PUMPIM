const express = require('express');
const pimRoutes = require('./src/pumpim/routes')
const app = express();
const port = 8080;

app.use(express.static(__dirname + "/public"));

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get("/", (req, res) => {
  res.json({ message: "ok" });
});

app.use(express.json());

app.use("/products", pimRoutes);

/* Error handler middleware */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
  return;
});

app.listen(port, () => console.log(`App listening on ${port}`));