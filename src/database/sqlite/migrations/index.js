const sqliteConnection = require("../../sqlite"); // ../ para sair da pasta e fazer o requeirmento do sqlite 

const createUsers = require("./createUsers");

async function migrationsRun () {
    const schemas = [ // foi colocado dento de um array, pois depois podem ter outras migrations
        createUsers //createUsers é uma migration que foi requerida na const createUsers
    ].join("");

    sqliteConnection()
    .then(db => db.exec(schemas))
    .catch(error => console.error(error));

}

module.exports = migrationsRun;