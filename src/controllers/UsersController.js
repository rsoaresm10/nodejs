const { hash, compare } = require("bcryptjs")

const AppError = require("../utils/AppError");

const sqliteConnection = require("../database/sqlite"); // fez uma requisição do arquivo onde o banco de dados foi criado

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
  return response.status(201).json();
  }

  async update(request, response){
    const { name, email, password, old_password } = request.body;
    const { id } = request.params;

    const database = await sqliteConnection();
    const user = await database.get("SELECT * FROM users WHERE id = (?)", [id]); // função para saber se o id do usuario ja existe 
  if (!user) { // se o usuário não existir 
throw new AppError("Usuário não encontrado ");
  }

  const userWithUpdateEmail = await database.get("SELECT * FROM users WHERE email = (?)", [email]) // função para saber se email do  usuário ja existe 
  if (userWithUpdateEmail && userWithUpdateEmail.id !== user.id) { // se o id do email for difernete do id do usuario, significa que este email ja está sendo usado por outra pessoa
    throw new AppError("este email ja está em uso");
  }

  user.name = name;
  user.email = email;

  if (password && !old_password) {
    throw new AppError("informe a senha antiga")
  }

  if (password && old_password) {
    const checkOldPassword = await compare(old_password, user.password)
  }

  await database.run(`
  UPDATE users SET 
  name = ?,
  email = ?, 
  updated_at = ?
  WHERE id = ?`,
  [user.name, user.email, new Date(), id]
  );
return response.json();
  }
}
module.exports = UsersController;
