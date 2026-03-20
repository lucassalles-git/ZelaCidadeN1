//Importações

//Express - framework que cria o servidor e as rotas
const express = require("express");

//A chave que vai abrir a conexão com o banco de dados
const { criarBanco } = require("./database");

//Inicialização: Ligando o motor do servidor
const app = express();

//Tradutor: Configura o Express para entender dados enviados no formato JSON
app.use(express.json());

//Criando a rota principal /Rota raiz

app.get("/", (req, res) => {
  //res.send: Envia uma resposta simples (texto, html, json)
  res.send(`
    <body>
    <h1>ZelaCidade</h1>

    <h2>Gestão de Problemas Urbanos</h2>

    <p>Endpoint que leva aos incidentes 
    cadastrados: /incidentes</p>

    </body>
    `);
});

//Porta do servidor

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

//Rota de Listagem para buscar os problemas registrados

app.get("/incidentes", async (req, res) => {
  const db = await criarBanco(); //Chamamos a função do outro arquivo. O await é o "aguarde", pois o banco precisa de tempo para abrir.

  const listaIncidentes = await db.all(`SELECT * FROM incidentes`);

  res.json(listaIncidentes); //Entrega esses dados para o cliente e fotmaro JSON
});
