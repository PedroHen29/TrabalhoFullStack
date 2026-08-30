import { Not } from "typeorm";
import { AppDataSource } from "../database/dataSource";
import { AtualizarProdutoDTO } from "../dtos/produto/AtualizarProdutoDTO";
import { CriarProdutoDTO } from "../dtos/produto/CriarProdutoDTO";
import { ConflictError, NotFoundError } from "../errors/AppError";
import { Produtos } from "../models/Produto";

const produtoRepository = AppDataSource.getRepository(Produtos)

export class ProdutoService {
    async criarProduto(dados: CriarProdutoDTO){
        const produtoExiste = await produtoRepository.findOne({where: {nome:dados.nome}})
        if(produtoExiste){
            throw new ConflictError('Produto com esse nome já existe.')
        }
        const produto = produtoRepository.create(dados)
        await produtoRepository.save(produto)
        return produto
    }

    async buscarProduto(id:number){
        const produto = await produtoRepository.findOne({where: {id:id}})
        if(!produto){
            throw new NotFoundError('Produto não encontrado.')
        }
        return produto
    }

    async atualizarProduto(id:number, dados: AtualizarProdutoDTO){
        const produto = await produtoRepository.findOne({where: {id:id}})
        if(!produto){
            throw new NotFoundError('Produto não encontrado.')
        }
        
        if(dados.nome !== undefined){
            const validar = await produtoRepository.findOne({where: {nome:dados.nome, id: Not(id)}})
            if(validar){
                throw new ConflictError('Produto com esse nome já existe.')
            }
        }
        const novosDados = {...dados}

        const novoProduto = Object.assign(produto, novosDados)
        await produtoRepository.save(novoProduto)
        return novoProduto
    }

    async deletarProduto(id:number){
        const produto = await produtoRepository.findOne({where: {id:id}})
        if(!produto){
            throw new NotFoundError('Produto não encontrado.')
        }
        await produtoRepository.remove(produto)
    }
}