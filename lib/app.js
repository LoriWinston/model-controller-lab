const express = require('express');
const app = express();

// {"name": "bluejay"}
app.use(express.json());

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

app.use("/api/v1/birds", require("./controllers/birds"));

module.exports = app;
