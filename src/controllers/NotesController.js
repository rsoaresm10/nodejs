const knex = require("../database/knex"); 


class NotesController {
    async create(request, response) {
        const { title, description, tags, links } = request.body; //requsição dos parametros que vão ser colocados no insomnia
        const { user_id } = request.params; // o id vai ser passado na rota

        const notes_id = await knex("notes").insert({
            title,    // vai inserir os dados diretamente no banco usando knex("notes")para dizer onde será o destino .insert para inserir na tabela 
            description,
            user_id
        })
    
        const linksInsert = links.map(link => { // o map vai percorrer ada link e com isso a função link => vai retornar os valores 
            return {
                notes_id,
                url: link
            }
           
        });
    
    
     await knex("links").insert(linksInsert) // na tabela links através do knex vai ser inserido o linksInsert
    
        const tagsInsert = tags.map(name => { // o map vai percorrer cada tag e com isso a função name =>, pois o valor que interessa da tag é o nome dela,e com isso  vai retornar os valores 
            return {
            notes_id,
            name,
            user_id

            }
            
    });
    
    await knex("tags").insert( tagsInsert); //na tabela tags através do knex vai ser inserido o tagsInsert
    
    response.json();
    }


    async show (request, response) { // mostrar a nota 
        const { id } = request.params;
        const notes = await knex("notes").where({id}).first(); // vai fazer a função de pegar apenas uma nota
        const tags = await knex("tags").where({notes_id: id}).orderBy("name");// vai pegar as tags quando o note_id for igual ao id passado como parametro na rota e ordenar elas em ordem alfabetica       
        const links = await knex("links").where({notes_id: id}).orderBy("created_at")

        return response.json({
            ...notes,
            tags,
            links
        })
    
    }

    async delete (request, response) {
        const { id } = request.params
         await knex("notes").where({id}).delete();

        return response.json()
    }
}

    module.exports = NotesController