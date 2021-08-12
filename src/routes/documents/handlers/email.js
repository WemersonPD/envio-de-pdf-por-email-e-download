// Imports
const sgMail = require("@sendgrid/mail");

// Configs
// Send Grid
sgMail.setApiKey(process.env.SENDGRID_API_KEY); // Pego do seu arquivo .env, informe uma api key do seu sendgrid
const sendgridEmail = process.env.SENDGRID_EMAIL; // Pego do seu arquivo .env, informe o email do seu sendgrid

// PDF make
const printer = require("../../../configs/pdfPrinter");

module.exports = async (req, res) => {
  // Você poderia pegar esse email pelo body da requisição, porém, para deixar mais fácil de testar com um simples get no navegador, vamos pegar assim, hardcode.
  // Informe seu email aqui
  // const yourEmail = "wpdads10@gmail.com";

  // await sgMail.send({
  //   subject: "PDF envido por WemersonPD",
  //   to: yourEmail,
  //   from: sendgridEmail,
  //   html: `<h1>Email de teste enviado por WemersonPD<h1>`,
  // });

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

  // Quando finalizar a criação, será chamado
  return pdfDoc.on("end", async () => {
    // Você poderia pegar esse email pelo body da requisição, porém, para deixar mais fácil de testar com um simples get no navegador, vamos pegar assim, hardcode.
    // Informe seu email aqui
    const yourEmail = "wpdads10@gmail.com";

    try {
      await sgMail.send({
        subject: "PDF envido por WemersonPD", // Título do email
        to: yourEmail, // Pra quem você vai enviar
        from: sendgridEmail, // Seu email do sendgrid
        html: `<h1>Email de teste enviado por WemersonPD<h1>`, // Corpo do email
        attachments: [
          // São arquivos para serem enviado por email
          {
            filename: "pdf-de-teste-wemersonpd", // Nome do arquivo
            // Concateno cade pedaço do pdf, e transformo em base64
            content: Buffer.concat(chuncks).toString("base64"), // Arquivo em base 64, o SEND GRID pede que seja assim
            type: "application/pdf", // Informando o tipo do arquivo
            disposition: "attachment", // Informando que é um anexo
          },
        ],
      });

      return res.status(200).json({
        enviado: "Sim",
      });
    } catch (error) {
      console.log("Erro ao enviar o email com o pdf", error);
      return res.status(500).json({
        enviado: "Não",
      });
    }
  });
};
