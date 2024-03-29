const { Router} = require("express");

const usersRouter = require("./users.routes"); // está importando as rotas e estão sendo usada pelo routes e sendo exportadas para o servidor
const notesRouter = require("./notes.routes"); // está importando as rotas e estão sendo usada pelo routes e sendo exportadas para o servidor
const tagsRouter = require("./tags.routes")
const sessionsRouter = require("./sessions.routes")

const routes = Router();

routes.use("/users" , usersRouter);
routes.use("/sessions", sessionsRouter)
routes.use("/notes", notesRouter);
routes.use("/tags", tagsRouter)


module.exports = routes;