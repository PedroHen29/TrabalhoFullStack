import { AppDataSource } from "../database/dataSource";
import { AtualizarPedidoDTO } from "../dtos/pedido/AtualizarPedidoDTO";
import { CriarPedidoDTO } from "../dtos/pedido/CriarPedidoDTO";
import { BadRequestError, NotFoundError } from "../errors/AppError";
import { ItemPedido } from "../models/ItemPedido";
import { Produtos } from "../models/Produto";

const pedidoRepository = AppDataSource.getRepository('Pedidos')
const usuarioRepository = AppDataSource.getRepository('Usuarios')
const produtoRepository = AppDataSource.getRepository(Produtos)
const itemPedidoRepository = AppDataSource.getRepository(ItemPedido)

export class PedidoService {
    async criarPedido(dados: CriarPedidoDTO){
        const usuario = await usuarioRepository.findOne({where: {id:dados.usuarioId}})
        if(!usuario){
            throw new NotFoundError('Usuario não encontrado.')
        }

        const produto = await produtoRepository.findOne({where: {id:dados.produtoId}})
        if(!produto){
            throw new NotFoundError('Produto não encontrado')
        }

        if(dados.quantidade > produto.estoque){
            throw new BadRequestError('Estoque insuficiente')
        }
        produto.estoque = produto.estoque - dados.quantidade

        await produtoRepository.save(produto)
        const valorTotal = produto.preco*dados.quantidade
        const pedido = pedidoRepository.create({
            data: new Date(),
            valorTotal,
            usuario
        })
        await pedidoRepository.save(pedido)

        const itemPedido = itemPedidoRepository.create({
            quantidade: dados.quantidade,
            precoUnitario: produto.preco,
            pedido,
            produto
        })
        await itemPedidoRepository.save(itemPedido)
        return itemPedido
    }

    async buscarPedido(id:number){
        const pedido = await pedidoRepository.findOne({where: {id:id}})
        if(!pedido){
            throw new NotFoundError('Pedido não encontrado.')
        }
        return pedido
    }

    async atualizarPedido(id: number, dados: AtualizarPedidoDTO) {
        const pedido = await pedidoRepository.findOne({ where: { id } });
        if (!pedido) {
        throw new NotFoundError('Pedido não encontrado');
        }

        if(dados.valorTotal !== undefined){
            if(dados.valorTotal <= 0){
                throw new BadRequestError('Valor total não pode ser menor ou igual a zero.')
            }
        }

        if (dados.usuarioId !== undefined) {
            const usuario = await usuarioRepository.findOne({ where: { id: dados.usuarioId } });
            if (!usuario) {
                throw new NotFoundError('Usuário não encontrado');
            }
            pedido.usuario = usuario;
        }

        if (dados.data !== undefined) pedido.data = dados.data;
        if (dados.valorTotal !== undefined) pedido.valorTotal = dados.valorTotal;

        return await pedidoRepository.save(pedido);
    }

    async deletarPedido(id:number){
        const pedido = await pedidoRepository.findOne({where: {id:id}})
        if(!pedido){
            throw new NotFoundError('Pedido não encontrado.')
        }
        console.log('ID recebido:', id)
        console.log('ID do pedido encontrado:', pedido.id)

        const resultado = await pedidoRepository.remove(pedido)
        console.log(resultado)
    }
}