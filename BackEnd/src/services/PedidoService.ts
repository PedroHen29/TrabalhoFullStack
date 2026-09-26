import { AtualizarPedidoDTO, CriarPedidoDTO } from "../dtos/pedidoDTO";
import { BadRequestError, NotFoundError } from "../errors/AppError";
import { pedidoRepository } from "../repository/pedidoRepository";
import { produtoRepository } from "../repository/produtoRepository";
import { usuarioRepository } from "../repository/usuarioRepository";
import {itemPedidoRepository} from "../repository/itemPedidoRepository";


export class PedidoService {
    async criarPedido(usuarioId: number, dados: CriarPedidoDTO){
        const usuario = await usuarioRepository.buscarPeloId(usuarioId)
        if(!usuario){
            throw new NotFoundError('Usuario não encontrado')
        }
        const pedido = await pedidoRepository.criar({
            usuario: usuario,
            data: new Date(),
            valorTotal: 0
        })
        for(const item of dados.itens){
            const produto = await produtoRepository.buscarPeloId(item.produtoId)
            if(!produto)throw new NotFoundError('Produto não encontrado')
            if(item.quantidade > produto.estoque)throw new BadRequestError('Quantidade maior que estoque')
            produto.estoque -= item.quantidade
            await produtoRepository.salvar(produto)
            await itemPedidoRepository.criar({
                quantidade: item.quantidade,
                precoUnitario: produto.preco,
                pedido,
                produto
            })
            pedido.valorTotal += produto.preco*item.quantidade
            
        }
        await pedidoRepository.salvar(pedido)
        return pedido
    }

    async buscarPedido(usuarioId:number){
        const pedido = await pedidoRepository.buscarPeloId(usuarioId)
        if(!pedido){
            throw new NotFoundError('Pedido não encontrado.')
        }
        return pedido
    }

    async listar(id:number){
        return await pedidoRepository.listar(id)
    }

    async atualizarPedido(id: number, dados: AtualizarPedidoDTO) {
        const pedido = await pedidoRepository.buscarPeloId(id)
        if(!pedido)throw new NotFoundError('Pedido não encontrado')
        if(dados.data)pedido.data = dados.data

        return await pedidoRepository.salvar(pedido)
    }

    async deletarPedido(pedidoId: number) {
        const pedido = await pedidoRepository.buscarPeloId(pedidoId)
        if (!pedido) {
            throw new NotFoundError('Pedido não encontrado.')
        }
    
        const itens = await itemPedidoRepository.buscarItensPeloPedidoId(pedido.id)
        if (itens.length === 0) {
            throw new NotFoundError('Itens do pedido não encontrados.')
        }
    
        for (const item of itens) {    
            item.produto.estoque += item.quantidade    
            await produtoRepository.salvar(item.produto)  
            await itemPedidoRepository.deletar(item.id)
        }
        await pedidoRepository.deletar(pedidoId)
    }
}