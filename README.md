# 🏙️ API ZelaCidade

## 📌 Sobre o Projeto

A API **ZelaCidade** é uma API para registrar e gerenciar problemas urbanos como:

- Buraco
- Vazamentos
- Lixo
- Iluminação

Ela permite criar, visualizar, atualizar e deletar ocorrências.

## 🛠️ Tecnologias utilizadas

- Node.js
- Postman
- Express
- SQlite
- SQLite3

---

## 📦 Instalação

```bash
npm install
```

## ▶️ Como Executar

```bash
npm run dev
```

Servidor disponível em: http://localhost:3000

---

🗄️ Banco de Dados

O baco de dados é criado automaticamente ao iniciar o projeto.

```
database.db
```

### 🧾 Tabela

| Campo            | Descrição                 |
| ---------------- | ------------------------- |
| id               | Identificador Único       |
| tipo_problema    | Tipo do problema          |
| localizacao      | Onde ocorreu              |
| descricao        | Detalhes do incidente     |
| prioridade       | Baixa, Média ou Alta      |
| nome_solicitante | Quem registrou            |
| data_registro    | Data do Registro          |
| hora_registro    | Hora do registro          |
| status_resolucao | Status (padrão: Pendente) |

## 🔗 Endpoints

### Rota Inicial

```http
GET /
```

Retorna uma página HTML simples
com informações da API

---

### Rota para listar todos os incidentes

```http
GET /incidentes
```

Retorna todos os registros do banco de dados

### Rota pra buscar um incidente por ID

```http
GET /incidentes/:id
```
Exemplo:

```
/incidentes/1
```

### Rota para criar um novo incidente

```http
POST /incidentes
```

#### Body(JSON):

```json
{
    "tipo_problema": "Queda de árvore", 
    "localizacao": "Praça da liberdade, 210", 
    "descricao": "Árvore de grande porte caiu sobre fiação", 
    "prioridade": "Alta", 
    "nome_solicitante": "Beatriz Lima", 
    "data_registro": "23/03/2026",
     "hora_registro": "15:30"
}
```

### Rota para atualizar um incidente

```http
PUT /incidentes/:id
```

#### body(JSON)

```json
{
    "descricao": "Calçada causando acidentes",
    "prioridade": "Urgente",
    "status_resolucao": "Em analise"
}
```

### Rota para deletar um incidente

```http
DELETE /incidente/:id
```
---

## 🔐 Segurança

A API utiliza `?` nas queries SQL:

```sql
WHERE id = ?
```

Isso evita o SQL Injection
---

## 📚 Conceitos

- CRUD (Create, Read, Update e Delete)
- Rotas com Express
- Métodos/Verbos HTTP (GET, POST, PUT, DELETE)
- Banco de dados SQLite
- SQL básico
- Uso de `req.params` e `req.body`

## 🎯 Observações

- O banco é criado automaticamente
- Dados iniciais são inseridos apenas se estiver vazio
- A API pode ser testada com o Postman

---

## 👩‍💻 Projeto educacional

Este projeto foi desenvolvido para fins de aprendizado em back-end com Node.js





<!-- ## 🚀 Nome da API / Projeto
## 📌 Sobre o Projeto
## 🎯 Objetivo
## 🛠️ Tecnologias
## 📦 Instalação
## ▶️ Como Executar
## ⚙️ Configurações
## 🗄️ Banco de Dados
## 🔗 Endpoints
## 🔐 Segurança
## 📚 Conceitos
## 💡Dicas / Melhorias
## 👩‍💻 Autor

---

## 📖 Descrição
## 🔧 Ferramentas
## 💻 Ambiente
## 📊 Dados
## 🧾 Tabela
## 📡 Requisições
## 📥 Entrada de dados
## 📤 Saída de dados
## 🚫 Bloqueios / proteção
## 🧠 Aprendizado
## 🎓 Educacional
## ⚠️ Atenção
## ❗Importante
## 🤝 Contribuição
## 📄 Licença -->
