class AppError {
    message;
    statusCode;

    constructor(message, statusCode = 400) {
      this.message = message; // o this faz a função de pegar o message dentro do constructor e passar para o message global
      this.statusCode = statusCode
    }
    
}

module.exports = AppError;