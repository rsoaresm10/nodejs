const AppError = require("../utils/AppError")

class UsersController {
create (request, response) {
    const { name, email ,password } = request.body;
    
    response.json({name, email, password});

    if (!name) {
        throw new AppError('nome obrigatório');
        
    }
}
}
module.exports = UsersController