import { AppDataSource } from "../database/dataSource";
import { ItemPedido } from "../models/ItemPedido";


const repo = AppDataSource.getRepository(ItemPedido)

export const itemPedidoRepository = {
    async buscarPeloPedidoId(pedidoId: number) {
    return await repo.findOne({where: {pedido: {id: pedidoId}},relations: {produto: true}})
    },

    async salvar(itemPedido: ItemPedido) {
        return await repo.save(itemPedido)
    },

    async criar(dados: Partial<ItemPedido>) {
        const itemPedido = repo.create(dados)
        return await repo.save(itemPedido)
    }
}