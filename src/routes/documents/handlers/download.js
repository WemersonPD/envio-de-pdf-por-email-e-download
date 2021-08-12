const printer = require("../../../configs/pdfPrinter");

module.exports = (req, res) => {
  const pdfDoc = printer.createPdfKitDocument({
    defaultStyle: { font: "Roboto" },
    content: [
      "First paragraph",
      "Another paragraph, this time a little bit longer to make sure, this line will be divided into at least two lines",
    ],
  });

  // Chuncks são pedaços do seu arquivo
  const chuncks = [];

  pdfDoc.on("data", (chunck) => {
    // Montando o arquivo juntando os pedaços
    chuncks.push(chunck);
  });

  // Finalizando a criação do arquivo
  pdfDoc.end();

  return pdfDoc.on("end", () => {
    // Se for end, o usuário irá visualizar no browser.
    return res.end(Buffer.concat(chuncks));
    // Se for send, o usuário irá fazer o download automaticamente do arquivo
    // return res.send(Buffer.concat(chuncks));
  });
};
