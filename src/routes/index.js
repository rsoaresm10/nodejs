const { Router} = require("express");

const usersRouter = require("./users.routes"); // está importando as rotas e estão sendo usada pelo routes e sendo exportadas para o servidor
const notesRouter = require("./notes.routes"); // está importando as rotas e estão sendo usada pelo routes e sendo exportadas para o servidor

const routes = Router();

routes.use("/users" , usersRouter);
routes.use("/notes", notesRouter);
module.exports = routes;