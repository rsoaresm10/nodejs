const { hash, compare } = require("bcryptjs")

const AppError = require("../utils/AppError");

const sqliteConnection = require("../database/sqlite"); // fez uma requisição do arquivo onde o banco de dados foi criado
const { Database } = require("sqlite");

class UsersController {
  async create(request, response) {
    const { name, email, password } = request.body;

    const database = await sqliteConnection(); // criou uma constante passando a função de ciração do arquivo do banco de dados
    const checkUserExists = await database.get(
      "SELECT * FROM users WHERE email = (?)",


      [email]
    );
    // vai checar dentro do banco de dados se o usuário existe onde o email seja igua ao que for requisitado
    // (?), [email]  serve para substituir o valor dentro da variavel pelo valor do email que vai ser pedido
  if(checkUserExists) {
    throw new AppError("este email ja esta em uso")
  }
  const hashedPassword = await hash(password, 8); //função hash recebendo 2 argumentos, primeiro o password e dspois o fator de complexidade 

  await database.run( // criação do usuario no insomnia, inserindo registros no banco de dados
    "INSERT INTO users (name, email , password) VALUES (?, ?, ?)" ,
   [name, email , hashedPassword] ) // inves de passar a senha aberta, ja foi passada a criptografia
  return response.status(201).json("");
  }

  async update(request, response) {
    const { name, email, password, old_password } = request.body
const user_id = request.user.id
    const database = await sqliteConnection()

    const user = await database.get("SELECT * FROM USERS WHERE id = (?)", [user_id]); // vai buscar o id no banco de dados recebendo o id do request params
      if(!user) {
        throw new AppError("Usuário não encontrado");
      }

    const userWithUpdatedEmail = await database.get("SELECT * FROM USERS WHERE email = (?)", [email]); // vai buscar o email  no banco de dados recebendo o email do request.body e pegar o email do usuário

    if(userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id) {
      throw new AppError("Email já está em uso")
    }
 
 
    user.name = name;
   user.email = email;

   if (password && !old_password) {
    throw new AppError ("Informe sua senha antiga")
   }

   if (password && old_password) {
    const checkOldPassword = await compare(old_password, user.password)
    if (!checkOldPassword){
      throw new AppError("A senha não confere")
    }
    user.password = await hash( password, 8)
   }

   await database.run(`
   UPDATE users SET
   name = ?,
   email = ?,
   password = ?,
   updated_at = ?
   WHERE id = ?`,
   [user.name, user.email, user.password, new Date(), user_id]);
   return response.status(200).json();
  }
}
module.exports = UsersController;
