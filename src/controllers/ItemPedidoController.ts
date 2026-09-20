import e, { Request, Response, NextFunction } from "express";
import { pedidoRepository } from "../repository/pedidoRepository";
import { ItemPedidoService } from "../services/ItemPedidoService";
import { PedidoService } from "../services/PedidoService";
import { BadRequestError, UnauthorizedError } from "../errors/AppError";

const itemPedidoService = new ItemPedidoService();
const pedidoService = new PedidoService();
export class ItemPedidoController {
  async deletar(req: Request, res: Response, next: NextFunction) {
    try {
      const usuarioId = (req as any).usuario.id;
      const { id } = req.params;
      const itemPedidoId = Number(id);

      const itemPedido = await itemPedidoService.buscarItemPedido(itemPedidoId);
      const pedido = await pedidoService.buscarPedido(itemPedido.id);
      if (pedido.usuario.id !== usuarioId)
        throw new UnauthorizedError("Você não pode deletar este pedido");

      await itemPedidoService.deletarItemPedido(itemPedidoId);
      return res.status(200).json({ message: "Item deletado com sucesso!" });
    } catch (err) {
      next(err);
    }
  }
}
