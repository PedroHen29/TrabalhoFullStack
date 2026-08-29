import { AppDataSource } from "../database/dataSource";
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
}