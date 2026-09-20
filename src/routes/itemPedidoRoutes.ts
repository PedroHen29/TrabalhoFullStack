import { Router } from "express";
import { ItemPedidoController } from "../controllers/ItemPedidoController";
import { autenticacaoMiddleware } from "../middlewares/autenticacaoMiddleware";


const router = Router()
const controller = new ItemPedidoController()

router.delete('/:id', autenticacaoMiddleware, controller.deletar)

export default router