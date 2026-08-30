import { Router } from "express";
import { ProdutoController } from "../controllers/ProdutoController";

const router = Router()
const produtoController = new ProdutoController()

router.post('/', produtoController.criarProduto)
router.get('/:id', produtoController.buscarProduto)
router.put('/:id', produtoController.atualizarProduto)
router.delete('/:id', produtoController.deletarProduto)

export default router