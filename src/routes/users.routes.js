const { Router, request, response } = require("express");
const multer = require("multer")
const uploadConfig = require("../config/upload")
const usersRoutes = Router();
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")

const upload = multer(uploadConfig.MULTER) // passou as configurações do multer
const UsersController = require("../controllers/UsersController");
const UserAvatarController = require("../controllers/UserAvatarController")

const usersController = new UsersController(); 
const userAvatarController = new UserAvatarController()

usersRoutes.post("/",  usersController.create);
usersRoutes.put("/",ensureAuthenticated , usersController.update) // o id não está mais sendo passado na rota, pq no middleware ele ja está sendo passado no user_id
usersRoutes.patch("/avatar", ensureAuthenticated, upload.single("avatar"), userAvatarController.update );

     module.exports = usersRoutes;