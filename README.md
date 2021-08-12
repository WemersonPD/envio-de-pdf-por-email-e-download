# Este repo tem como intuito ensinar a trabalhar com pdfs.

### Sobre:

A biblioteca utilizada foi o [`PDF make`]("https://pdfmake.github.io/docs/0.1/), pois até o momento foi a mais simples e legal de utilizar que eu encontrei.

Mostrei dois exemplos com sua utilização, uma para que o usuário possa fazer o download do pdf e outra para que o usuário possa enviar o documento por email.

### Importante:

**Para o envio do pdf por email, você precisará de uma conta no [twillio]("https://www.twilio.com/").**

### Como rodar:

- Instale os pacotes `npm install`.
- Crie um arquivo `.env` com as credencias que extão no `.env.example`.
- Rode o comando `npm run dev`, no qual irá subir seu servidor na porta `3000`.

### Rotas:

- `/documents/download`, para baixar ou abrir o pdf via navegador.
- `/documents/email`, para enviar o documento por email.
