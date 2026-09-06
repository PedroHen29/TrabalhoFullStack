import { UsuarioController } from "../controllers/UsuarioController";
import { Router } from "express";
import { autenticacaoMiddleware } from "../middlewares/autenticacaoMiddleware";

const router = Router()

const usuarioController = new UsuarioController()

router.post('/', usuarioController.criarUsuario)
router.post("/login", usuarioController.loginUsuario.bind(usuarioController))
router.get('/:id', autenticacaoMiddleware, usuarioController.buscarUsuario.bind(usuarioController))
router.get('/', usuarioController.listar)
router.put('/', autenticacaoMiddleware, usuarioController.atualizarUsuario.bind(usuarioController))
router.delete('/', autenticacaoMiddleware, usuarioController.deletarUsuario.bind(usuarioController))

export default router