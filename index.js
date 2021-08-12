// Imports
const express = require("express");
const PdfPrinter = require("pdfmake");
const dotEnv = require("dotenv");

// Configs
dotEnv.config();

const app = express();
require("./src/routes")(app);

// Global vars
const PORT = process.env.PORT;

app.listen(PORT, console.log("Server rodando na porta:", PORT));
