const knex = require("../database/knex")
const AppError = require("../utils/AppError")
const DiskStorage = require("../providers/DiskStorage")

class UserAvatarController {
    async update(request,response) {
        const user_id = request.user.id// quando ele faz a verificação do token no middleware, o id do usuario é passado e verificado
        const avatarFileName = request.file.filename
        const user = await knex("users").where({id: user_id}).first()
    const diskStorage = new DiskStorage(); //instanciou o Diskstorage
        
    if(!user) {
            throw new AppError("somente usuários autenticados podem mudar a foto", 401)
        }

        if (user.avatar){ // se ja tiver algum arquivo no banco de dados, ele vai deletar
    await diskStorage.deleteFile(user.avatar)
        }
        const filename = await diskStorage.saveFile(avatarFileName) // vai salvar a imagem
        user.avatar = filename // vai passar a imagem depois da verificação do usuário
    
    await knex("users").update(user).where({id: user_id});

    return response.json(user)
    
    }
}

module.exports = UserAvatarController