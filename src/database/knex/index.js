const config = require("../../../knexfile"); // fazendo o requerimento das configurações do arquivo knex
const knex = require("knex");
const connection = knex(config.development);


module.exports = connection