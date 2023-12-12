const express = require('express');
const app = express();
const PORT = 8080;
const cors = require("cors");


app.use(cors());

app.get("/api/home", (req, res) => {
    res.send("Hello from the server!");
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
