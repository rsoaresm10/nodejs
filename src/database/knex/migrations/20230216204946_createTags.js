exports.up = knex => knex.schema.createTable("tags", table => { // criação da tabela de tags
    table.increments("id");
    table.text("name").notNullable(); // name não aceita null como resposta 
    table.integer("notes_id").references("id").inTable("notes").onDelete("CASCADE"); // notes_id vai pegar o id que está na tabela notes, E o onDELETE() é uma função que se as notas forem deletadas, as tags também vão ser 
    table.integer("user_id").references("id").inTable("users");// user_id vai pegar o id que se encontra na tabela users 
});


exports.down = knex => knex.schema.dropTable("tags");