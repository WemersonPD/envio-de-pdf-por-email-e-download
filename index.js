const express = require("express");
const PdfPrinter = require("pdfmake");

const app = express();

const fonts = {
  Roboto: {
    normal: "fonts/Roboto-Regular.ttf",
    bold: "fonts/Roboto-Medium.ttf",
    italics: "fonts/Roboto-Italic.ttf",
    bolditalics: "fonts/Roboto-MediumItalic.ttf",
  },
};
const printer = new PdfPrinter(fonts);

require("./src/routes")(app);

app.get("/", (req, res) => {
  const pdfDoc = printer.createPdfKitDocument({
    defaultStyle: { font: "Roboto" },
    content: [
      "First paragraph",
      "Another paragraph, this time a little bit longer to make sure, this line will be divided into at least two lines",
    ],
  });

  // pdfDoc.pipe(fs.createWriteStream("document.pdf"));

  const chuncks = [];

  pdfDoc.on("data", (chunck) => {
    chuncks.push(chunck);
  });

  pdfDoc.end();

  return pdfDoc.on("end", () => {
    // Se for end, o usuário irá visualizar no browser.
    // return res.end(Buffer.concat(chuncks));
    // Se for send, o usuário irá fazer o download automaticamente do arquivo
    // return res.send(Buffer.concat(chuncks));
  });
});

app.listen("3000", console.log("App running at port: 3000"));
