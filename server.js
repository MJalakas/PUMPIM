const express = require('express');
const pimRoutes = require('./src/pumpim/routes')

const app = express();
const port = 3000;

app.use(express.static("./public"));

app.use(express.json());

app.use("/products", pimRoutes);

app.listen(port, () => console.log(`App listening on ${port}`));