const knex = require("../database/knex"); 


class NotesController {
    async create(request, response) {
        const { title, description, tags, links } = request.body; //requsição dos parametros que vão ser colocados no insomnia
        const  user_id  = request.user.id; // o id vai ser passado na rota

        const [notes_id] = await knex("notes").insert({
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
    
     return response.json();
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


    async index (request, response) {
        const { title , tags} = request.query;
        const user_id = request.user.id

        let notes;
        if(tags) {
            const filterTags = tags.split(',').map(tag => tag.trim()); // vai filtras as tags para que elas sejam pesquisadas na mesma query atraves da virgula e o map( para que filtre somente as tags)

            notes = await knex("tags")
            .select([
                "notes.id", // nome da tabela + campo selecionado
                "notes.title" , 
                "notes.user_id",
            ])
            .where("notes.user_id", user_id) //vai filtrar onde na tabela notes o user_id seja igual ao q está sendo passado
            .whereLike("notes.title" , `%${title}%`) // vai filtrar onde o notes.title seja igual ao title da interpolação
            .whereIn("name", filterTags) //vai selecionar as tags e foi passado o name que vai estar dentro da tag para que ele compare com o array do filterTags
            .innerJoin("notes" , "notes.id", "tags.notes_id") // na tabela notes vai ser pego o id e comparando com a tabela tag vai pegar o notes_id 
            .groupBy("notes.id")
            .orderBy("notes.title") // vai ordenar em ordem alfabetica pelo titulo
    
    } else {
        notes = await knex("notes").where({user_id}).whereLike("title", `%${title}%`).orderBy("title") //vai buscar nas notas onde tem o id do usuario, o whereLike serve para buscar valores que contenham dentro de uma palavra, passando o campo que ele quer q seja feita consulta e o segundo argumento serve para que ele pesquise antes e depois da frase, se existe o que está sendo pesquisado 
        }

    const userTags = await knex("tags").where({user_id}); // vai percorrer a tabela  tags atraves do user id e devolver as tags cadastradas
    const notesWithTags = notes.map(notes =>{ // vai percorrer as notas 
        const noteTag = userTags.filter(tag => tag.notes_id === notes.id ) //percorrer dentro de notas para as tags e  dentro da tabela de tags ele vai comparar o tag.notes_id (que é a tabela de tags ) com o id dentro de notas

        return {
            ...notes,
            tags: noteTag
        }
    
    })
        return response.json(notesWithTags) 
    }

}

    module.exports = NotesController