import { AppDataSource } from "../database/dataSource";
import { AtualizarPedidoDTO, CriarPedidoDTO } from "../dtos/pedidoDTO";
import { BadRequestError, NotFoundError } from "../errors/AppError";
import { ItemPedido } from "../models/ItemPedido";
import { Produtos } from "../models/Produto";
import { pedidoRepository } from "../repository/pedidoRepository";
import { produtoRepository } from "../repository/produtoRepository";
import { usuarioRepository } from "../repository/usuarioRepository";
import {itemPedidoRepository} from "../repository/itemPedidoRepository";


export class PedidoService {
    async criarPedido(dados: CriarPedidoDTO){
        const usuario = await usuarioRepository.buscarPeloId(dados.usuarioId)
        if(!usuario){
            throw new NotFoundError('Usuario não encontrado.')
        }

        const produto = await produtoRepository.buscarPeloId(dados.produtoId)
        if(!produto){
            throw new NotFoundError('Produto não encontrado')
        }

        if(dados.quantidade > produto.estoque){
            throw new BadRequestError('Estoque insuficiente')
        }
        produto.estoque = produto.estoque - dados.quantidade

        await produtoRepository.salvar(produto)
        const valorTotal = produto.preco*dados.quantidade
        const pedido = await pedidoRepository.criar({
            data: new Date(),
            valorTotal,
            usuario
        })
        await pedidoRepository.salvar(pedido)

        const itemPedido = await itemPedidoRepository.criar({
            quantidade: dados.quantidade,
            precoUnitario: produto.preco,
            pedido,
            produto
        })
        await itemPedidoRepository.salvar(itemPedido)
        return itemPedido
    }

    async buscarPedido(id:number){
        const pedido = await pedidoRepository.buscarPeloId(id)
        if(!pedido){
            throw new NotFoundError('Pedido não encontrado.')
        }
        return pedido
    }

    async listar(){
        return await pedidoRepository.listar()
    }

    async atualizarPedido(id: number, dados: AtualizarPedidoDTO) {
        const pedido = await pedidoRepository.buscarPeloId(id)
        
        if (!pedido) {
        throw new NotFoundError('Pedido não encontrado');
        }

        if(dados.valorTotal !== undefined){
            if(dados.valorTotal <= 0){
                throw new BadRequestError('Valor total não pode ser menor ou igual a zero.')
            }
        }
        if (dados.quantidade !== undefined) {

    if (dados.quantidade <= 0) {
        throw new BadRequestError(
            'Quantidade não pode ser negativa nem igual a zero'
        )
    }

    const itemPedido = await itemPedidoRepository.buscarPeloPedidoId(id)

    if (!itemPedido) {
        throw new NotFoundError('Item do pedido não encontrado.')
    }

    const produto = await produtoRepository.buscarPeloId(itemPedido.produto.id)

        if (!produto) {           
            throw new NotFoundError('Produto não encontrado.')
        }
        const diferenca = dados.quantidade - itemPedido.quantidade
        if (diferenca > produto.estoque) {
            throw new BadRequestError('Estoque insuficiente.')
        }
        produto.estoque = produto.estoque - diferenca
        itemPedido.quantidade = dados.quantidade
        await produtoRepository.salvar(produto)
        await itemPedidoRepository.salvar(itemPedido)
}
        if (dados.data !== undefined) pedido.data = dados.data;
        if (dados.valorTotal !== undefined) pedido.valorTotal = dados.valorTotal;

        return await pedidoRepository.salvar(pedido);
    }

    async deletarPedido(id:number){
        const pedido = await pedidoRepository.buscarPeloId(id)
        if(!pedido){
            throw new NotFoundError('Pedido não encontrado.')
        }
        console.log('ID recebido:', id)
        console.log('ID do pedido encontrado:', pedido.id)

        const resultado = await pedidoRepository.deletar(pedido.id)
        console.log(resultado)
    }
}