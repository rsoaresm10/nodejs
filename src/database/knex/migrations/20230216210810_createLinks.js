exports.up = knex => knex.schema.createTable("links", table => { // criação da tabela de tags
    table.increments("id");
    table.text("url").notNullable(); // não aceita nulo
    table.integer("notes_id").references("id").inTable("notes").onDelete("CASCADE"); // notes_id vai pegar o id que está na tabela notes, E o onDELETE() é uma função que se as notas forem deletadas, as tags também vão ser 
    table.timestamp("created_at").default(knex.fn.now());
});


exports.down = knex => knex.schema.dropTable("links");