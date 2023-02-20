const path = require("path")
module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: path.resolve(__dirname, "src", "database", "database.db") // o resolve vai sair do diretorio atual ate o arquivo database.db
    },
    pool: {
      afterCreate: (conn, cb) => conn.run("PRAGMA foreign_keys = on", cb) //PRAGMA foreign_keys = on" habilita a funcionalidade do onDelete("CASCADE")
    },
    migrations: {
      directory: path.resolve(__dirname, "src", "database", "knex", "migrations") // o path vai sair do diretorio atual ate achar o migartions dentro da pasta knex no database
    },
    useNullAsDefault: true
  },
  
};
