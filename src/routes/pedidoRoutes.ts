import { Router } from "express";
import { PedidoController } from "../controllers/PedidoController";
import { autenticacaoMiddleware } from "../middlewares/autenticacaoMiddleware";

const router = Router()
const pedidoController = new PedidoController()

router.post('/', autenticacaoMiddleware,  pedidoController.criarPedido)
router.get('/:id', autenticacaoMiddleware, pedidoController.buscarPedido)
router.get('/', autenticacaoMiddleware, pedidoController.listar)
router.put('/:id', autenticacaoMiddleware, pedidoController.atualizarPedido)
router.delete('/:id', autenticacaoMiddleware, pedidoController.deletarPedido)

export default router