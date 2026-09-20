import { AppDataSource } from "../database/dataSource";
import { Pedidos } from "../models/Pedido";

const repo = AppDataSource.getRepository(Pedidos);

export const pedidoRepository = {
  async criar(dados: Partial<Pedidos>) {
    const pedido = repo.create(dados);
    return await repo.save(pedido);
  },

  async buscarPeloId(id: number) {
    return await repo.findOne({
      where: { id: id },
      relations: { usuario: true, itens: { produto: true } },
    });
  },

  async listar() {
    return await repo.find({
      relations: { usuario: true, itens: { produto: true } },
    });
  },

  async salvar(pedido: Pedidos) {
    return await repo.save(pedido);
  },

  async deletar(id: number) {
    await repo.delete(id);
  },
};
