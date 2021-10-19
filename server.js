const express = require("express");
const {google} = require("googleapis");

const app = express();

app.get("/", (req, res) => {

    res.send("hello world");

});

app.listen(1337, (req, res) => console.log("running on 1337"));
