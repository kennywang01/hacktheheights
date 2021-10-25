const express = require("express");
const { auth } = require("google-auth-library");
const {google} = require("googleapis");
const spawn = require("child_process").spawn;
const pythonProcess = spawn('python',["sheets/sheet.py"]);

const app = express();

app.get("/", async (req, res) => {

    const auth = new google.auth.GoogleAuth({
        keyFile: "hth6sheets.json",
        scopes: "https://www.googleapis.com/auth/spreadsheets",
    });

    // Create client instance for auth
    const client = await auth.getClient();

    // Instance of Google Sheets API
    const googleSheets = google.sheets({version: "v4", auth: client});

    const spreadsheetID = "1bDp13YkgyKRjgqgiWMf6N6tx7ZDp-0sZCWl1vPxdQig";

    // Get metadata about spreadsheet
    const metaData = await googleSheets.spreadsheets.get({
        auth,
        spreadsheetId,
    });

    res.send(metaData);

});


app.listen(1337, (req, res) => console.log("running on 1337"));
