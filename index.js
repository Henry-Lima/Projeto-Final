const Sequelize = require("sequelize");
const express = require("express");
const cors = require("cors");

const app = express(); 
const { create } = require("express-handlebars");
app.use(cors());


const conexaoComBanco = new Sequelize("gerenciamento", "root", "", {
  host: "localhost",
  dialect: "mysql",
});


app.get("/aps/:Nome/:Descricao/:Data/:Funcionarios", function (req, res) {
    res.send({
        nome: req.params.Nome,
        descricao: req.params.Descricao,
        data: req.params.Data,
        funcionarios: req.params.Funcionarios,
    }); 
});


const Projeto = conexaoComBanco.define("projetos", {
  nome: {
      type: Sequelize.STRING,
  },

  descricao: {
      type: Sequelize.STRING,
  },

  data: {
      type: Sequelize.DATE,
  },

  funcionarios: {
      type: Sequelize.STRING,
  },
});


Projeto.sync({ force: false }); 

app.get("/mostrar", async function (req, res) {

  try {
      const mostrar = await Projeto.findAll(); // Busca todos os registros
      res.json(mostrar); // Retorna os registros em formato JSON
  }catch(error) {
      res.status(500).json({message:`Erro ao buscar alunos: ${error}`});
  }
  
});

// Projeto.create({
//   nome: "Stuart lirou",
//   descricao: "rato",
//   data:"30-Nov-2022",
//   funcionarios:"rato adotado"
// });


app.get("/salvar/:nome/:descricao/:data/:funcionarios", (req, res) => {
  Projeto.create({
    nome: req.params.nome,
    descricao: req.params.descricao,
    data: req.params.data,
    funcionarios: req.params.funcionarios,
  })
  res.send('seu cu darlan');

  
});


app.delete("deletar/:id", async function (req, res) {
  const {id} = req.params; 
  const idNumber = parseInt(id,10);

  const deleted = await Projeto.destroy({
    where: {id: idNumber},
  });

  if(deleted) {
    res.json({mensagem: "Evento deletado com sucesso"});
  }else {
    res.status(404).json({mensagem: "Evento não encontrado"});
  }
  
});



//SEMPRE MANTENHA NO FINAL DO CÒDIGO 
app.listen(3031, function () {
  console.log("Server is running on port 3031");
});