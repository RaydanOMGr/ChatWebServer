const express = require("express");
const path = require("path");
let app = express();

let publicDir = path.join(__dirname, "..", "public");
console.log(publicDir);
app.use(express.static(publicDir));

if (!process.env.SERVER_PORT) process.env.SERVER_PORT = 3000;
app.listen(process.env.SERVER_PORT, () => {
    console.log(`Running on port: ${process.env.SERVER_PORT}`);
});
