const { Router } = require("express");

const usersRoutes = Router();
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")


const UsersController = require("../controllers/UsersController");

const usersController = new UsersController(); 

usersRoutes.post("/",  usersController.create);
usersRoutes.put("/",ensureAuthenticated , usersController.update) // o id não está mais sendo passado na rota, pq no middleware ele ja está sendo passado no user_id

     module.exports = usersRoutes;