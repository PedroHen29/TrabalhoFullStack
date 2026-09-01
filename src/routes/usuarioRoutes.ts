import { UsuarioController } from "../controllers/UsuarioController";
import { Router } from "express";

const router = Router()

const usuarioController = new UsuarioController()

router.post('/', usuarioController.criarUsuario)
router.post("/login", usuarioController.loginUsuario.bind(usuarioController))
router.get('/:id', usuarioController.buscarUsuario)
router.put('/:id', usuarioController.atualizarUsuario)
router.delete('/:id', usuarioController.deletarUsuario)

export default router