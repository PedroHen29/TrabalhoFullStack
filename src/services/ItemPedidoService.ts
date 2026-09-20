import { NotFoundError } from "../errors/AppError";
import { itemPedidoRepository } from "../repository/itemPedidoRepository";
import { pedidoRepository } from "../repository/pedidoRepository";
import { produtoRepository } from "../repository/produtoRepository";

export class ItemPedidoService {
  async buscarItemPedido(itemPedidoId: number) {
    const itemPedido = await itemPedidoRepository.buscarPeloId(itemPedidoId);
    if (!itemPedido) throw new NotFoundError("Item não encontrado");
    return itemPedido;
  }

  async deletarItemPedido(itemPedidoId: number) {
    const itemPedido = await itemPedidoRepository.buscarPeloId(itemPedidoId);
    if (!itemPedido) throw new NotFoundError("Item Pedido não encontrado");

    const pedido = await pedidoRepository.buscarPeloId(itemPedido.pedido.id);
    if (!pedido) throw new NotFoundError("Pedido não encontrado");
    pedido.valorTotal -= itemPedido.precoUnitario * itemPedido.quantidade;
    if (pedido.valorTotal === 0) {
      await pedidoRepository.deletar(pedido.id);
    }
    await pedidoRepository.salvar(pedido);

    const produto = await produtoRepository.buscarPeloId(itemPedido.produto.id);
    if (!produto) throw new NotFoundError("Produto não encontrado");
    produto.estoque += itemPedido.quantidade;
    await produtoRepository.salvar(produto);

    await itemPedidoRepository.deletar(itemPedido.id);
  }

  async atualizarItemPedido(itemPedidoId: number) {}
}
