const express = require('express');
const app = express();
const PORT = 8080;


app.get("/api/home", (req, res) => {
    res.send("Hello from the server!");
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
