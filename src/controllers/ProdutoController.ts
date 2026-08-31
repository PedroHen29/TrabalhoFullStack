import { criarProdutoSchema } from "../dtos/produto/criarProdutoSchema";
import { ProdutoService } from "../services/ProdutoService";
import { Request, Response, NextFunction } from "express";
import { produtoParamsSchema } from "../dtos/produto/produtoParamsSchema";
import { atualizarProdutoSchema } from "../dtos/produto/atualizarProdutoSchema";
const produtoService = new ProdutoService()

export class ProdutoController {
    async criarProduto(req: Request, res: Response, next: NextFunction){
        try{
            const validar = criarProdutoSchema.safeParse(req.body)
            if(!validar.success){
                throw validar.error
            }
            const dados = validar.data
            const produto = await produtoService.criarProduto(dados)
            return res.status(201).json({message: 'Produto criado com sucesso.', produto})
        }catch(err){
            next(err)
        }
    }

    async buscarProduto(req: Request, res: Response, next: NextFunction){
        try{
            const validar = produtoParamsSchema.parse(req.params)
            const {id} = validar
            const produto = await produtoService.buscarProduto(id)
            return res.status(200).json({message: 'Produto encontrado.', produto})
        }catch(err){
            next(err)
        }
        
    }

    async atualizarProduto(req: Request, res: Response, next: NextFunction){
        try{
            const validarId = produtoParamsSchema.parse(req.params)
            const {id} = validarId

            const validar = atualizarProdutoSchema.safeParse(req.body)
            if(!validar.success){
                throw validar.error
            }
            const dados = validar.data
            const produto = await produtoService.atualizarProduto(id, dados)
            
            return res.status(200).json({message: 'Produto atualizado com sucesso.', produto})
        }catch(err){
            next(err)
        }
    }

    async deletarProduto(req: Request, res: Response, next: NextFunction){
        try{
            const validar = produtoParamsSchema.parse(req.params)
            const {id} = validar
            await produtoService.deletarProduto(id)

            return res.status(200).json({message: 'Produto deletado com sucesso.'})
        }catch(err){
            next(err)
        }
        
    }
}