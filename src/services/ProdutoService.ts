import { Not } from "typeorm";
import { ConflictError, NotFoundError } from "../errors/AppError";
import { AtualizarProdutoDTO, CriarProdutoDTO } from "../dtos/produtoDTO";
import { produtoRepository } from "../repository/produtoRepository";



export class ProdutoService {
    async criarProduto(dados: CriarProdutoDTO){
        const produtoExiste = await produtoRepository.buscarPeloNome(dados.nome)
        if(produtoExiste){
            throw new ConflictError('Produto com esse nome já existe.')
        }
        const produto = produtoRepository.criar(dados)
        return produto
    }

    async buscarProduto(nome: string){
        const produto = await produtoRepository.buscarPeloNome(nome)
        if(!produto){
            throw new NotFoundError('Produto não encontrado.')
        }
        return produto
    }

    async listar(){
        return await produtoRepository.listar()
    }

    async atualizarProduto(id: number, dados: AtualizarProdutoDTO){
        const produto = await produtoRepository.buscarPeloId(id)
        if(!produto){
            throw new NotFoundError('Produto não encontrado.')
        }
        
        if(dados.nome !== undefined){
            const validar = await produtoRepository.buscarPeloNome(produto.nome)
            if(validar){
                throw new ConflictError('Produto com esse nome já existe.')
            }
        }
        const novosDados = {...dados}

        const novoProduto = Object.assign(produto, novosDados)
        await produtoRepository.salvar(novoProduto)
        return novoProduto
    }

    async deletarProduto(id: number){
        const produto = await produtoRepository.buscarPeloId(id)
        if(!produto){
            throw new NotFoundError('Produto não encontrado.')
        }
        await produtoRepository.deletar(id)
    }
}