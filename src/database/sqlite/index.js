const sqlite3 = require("sqlite3");// esse é o drive que vai manter a conexão com a base de dados 
const sqlite = require("sqlite") // esse aq é responsável por conectar e
const path = require("path");//o path serve para rodar em qualquer sistema operacional e ele resolve os endereços de acordo com o ambiente

async function sqliteConnection () {
    const database = await sqlite.open({ // .open está abrindo uma conexão 
        filename: path.resolve(__dirname, "..", "database.db"),// objeto com configurações da aplicação // o dirname pega o diretório que eu estou, ".." volta uma casa no arquivo, e depois foi criado um novo arquivo
    driver: sqlite3.Database
         
    })          
    return database           
}

module.exports = sqliteConnection

//SGBD SISTEMA GERENCIADOR DE BANCO DE DADOS 