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

//Rota específica

//async - para não esperar outra coisa para ser executado
app.get("/incidentes/:id", async (req, res) => {
  //técnica de desistruturação
  const { id } = req.params;

  const db = await criarBanco();

  const incidenteEspecifico = await db.all(
    `SELECT * FROM incidentes WHERE id = ?`,
    [id],
  );
  //? - é um espaço reservado que será preenchido pelo valor da variável [id]
  //? - SQL Injection é usado para segurança

  res.json(incidenteEspecifico);
});

//Rota POST - Novos registros /Endpoints
app.post("/incidentes", async (req, res) => {
  const {
    tipo_problema,
    localizacao,
    descricao,
    prioridade,
    nome_solicitante,
    data_registro,
    hora_registro,
  } = req.body;

  const db = await criarBanco();

  await db.run(
    `INSERT INTO incidentes(tipo_problema, localizacao, descricao, prioridade, nome_solicitante, data_registro, hora_registro) VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [
      tipo_problema,
      localizacao,
      descricao,
      prioridade,
      nome_solicitante,
      data_registro,
      hora_registro,
    ],
  );

  //Envia uma resposta de confirmação para o cliente que fez a requisição
  res.send(
    `Incidente novo registrado: ${tipo_problema} registrado na data ${data_registro} por ${nome_solicitante}`,
  );
});

// Rota de atualização: Responsavel por editar um incidente já existente no banco
app.put("/incidentes/:id", async (req, res) => {
  //Pega o ID do incidente que vem pela URL (ex: /incidentes/4)
  const { id } = req.params;

  //Pega os novos dados enviados no corpo da requisição (O que será atualizado)
  const { descricao, prioridade, status_resolucao } = req.body;

  //Abre a conexão com o banco de dados
  const db = await criarBanco();

  await db.run(
    `
    UPDATE incidentes
    SET descricao = ?, prioridade = ?, status_resolucao = ?
    WHERE id = ?`,
    [descricao, prioridade, status_resolucao, id],
  );

  //Enviar uma resposta para o cliente
  res.send(`O incidente de ID ${id} foi atualizado com sucesso`);
});

//Rota de remoção: Responsável por apagar um incidente do banco de dados
app.delete("/incidentes/:id", async (req, res) => {
  const { id } = req.params;
  const db = await criarBanco();

  await db.run(`DELETE FROM incidentes WHERE id = ?`, [id]);

  res.send(`O incidente de id ${id} foi removido com sucesso`);
});
