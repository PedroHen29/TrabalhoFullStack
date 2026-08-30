import { AppDataSource } from "../database/dataSource";
import { AtualizarPedidoDTO } from "../dtos/pedido/AtualizarPedidoDTO";
import { CriarPedidoDTO } from "../dtos/pedido/CriarPedidoDTO";
import { NotFoundError } from "../errors/AppError";

const pedidoRepository = AppDataSource.getRepository('Pedidos')
const usuarioRepository = AppDataSource.getRepository('Usuarios')
export class PedidoService {
    async criarPedido(dados: CriarPedidoDTO){
        const usuario = await usuarioRepository.findOne({where: {id:dados.usuarioId}})
        if(!usuario){
            throw new NotFoundError('Usuario não encontrado.')
        }
        const pedido =  pedidoRepository.create({
            ...dados,
            usuario
        })
        await pedidoRepository.save(pedido)
        return pedido
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

        if (dados.usuarioId) {
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