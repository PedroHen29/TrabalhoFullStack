import { CriarPedidoDTO } from "../dtos/pedidoDTO";
import { BadRequestError, NotFoundError } from "../errors/AppError";
import { itemPedidoRepository } from "../repository/itemPedidoRepository";
import { pedidoRepository } from "../repository/pedidoRepository";
import { produtoRepository } from "../repository/produtoRepository";

export class ItemPedidoService {
  async adicionarItem(pedidoId: number, dados: CriarPedidoDTO) {
    const pedido = await pedidoRepository.buscarPeloId(pedidoId);

    if (!pedido) {
      throw new NotFoundError("Pedido não encontrado");
    }

    let valorTotalCalculado = Number(pedido.valorTotal) || 0;

    for (const item of dados.itens) {
      const produto = await produtoRepository.buscarPeloId(item.produtoId);

      if (!produto) {
        throw new NotFoundError("Produto não encontrado");
      }

      if (item.quantidade > produto.estoque) {
        throw new BadRequestError("Quantidade maior que estoque");
      }

      const itemExistente = pedido.itens.find(
        (itemPedido) => itemPedido.produto.id === item.produtoId,
      );

      if (itemExistente) {
        itemExistente.quantidade += item.quantidade;

        await itemPedidoRepository.salvar(itemExistente);
      } else {
        await itemPedidoRepository.criar({
          quantidade: item.quantidade,
          precoUnitario: Number(produto.preco),
          pedido,
          produto,
        });
      }

      produto.estoque -= item.quantidade;
      await produtoRepository.salvar(produto);

      valorTotalCalculado += Number(produto.preco) * item.quantidade;
    }

    pedido.valorTotal = valorTotalCalculado;

    await pedidoRepository.salvar(pedido);

    return pedido;
  }

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
