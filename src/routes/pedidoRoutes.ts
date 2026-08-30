import { Router } from "express";
import { PedidoController } from "../controllers/PedidoController";

const router = Router()
const pedidoController = new PedidoController()

router.post('/', pedidoController.criarPedido)
router.get('/:id', pedidoController.buscarPedido)
router.put('/:id', pedidoController.atualizarPedido)
router.delete('/:id', pedidoController.deletarPedido)

export default router