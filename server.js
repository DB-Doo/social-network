const express = require('express');
const db = require('./config/connection');
const routes = require("./routes/api");

const PORT = process.env.PORT || 3001;
const app = express();


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Use the API routes with the base path '/api'
app.use("/api", routes);

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on http://localhost:${PORT}!`);
  });
});