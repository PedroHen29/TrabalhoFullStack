import { AppDataSource } from "../database/dataSource";
import { CriarProdutoDTO } from "../dtos/produtoDTO";
import { Produtos } from "../models/Produto";

const repo = AppDataSource.getRepository(Produtos)

export const produtoRepository = {
    async criar(dados: CriarProdutoDTO){
        const produto = repo.create(dados)
        return await repo.save(produto)
    },

    async buscarPeloId(id: number){
        const produto = repo.findOne({where: {id: id}})
        return produto
    },

    async buscarPeloNome(nome: string){
        const produto = repo.findOne({where: {nome: nome}})
        return produto
    },

    async listar(){
        return await repo.find()
    },

    async salvar(produto: Produtos){
        return await repo.save(produto)
    },

    async deletar(id: number){
        await repo.delete(id)
    }
}