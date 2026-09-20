import { atualizarPedidoSchema, criarPedidoSchema } from "../dtos/pedidoDTO";
import { UnauthorizedError } from "../errors/AppError";
import { PedidoService } from "../services/PedidoService";
import { Request, Response, NextFunction } from "express";


const pedidoService = new PedidoService()

export class PedidoController {

    async criarPedido(req:Request, res: Response, next: NextFunction){
        try{
            const usuarioId = Number((req as any).usuario.id)
            const validar = criarPedidoSchema.safeParse(req.body)
            if(!validar.success)throw validar.error
            
            const dados = validar.data
            
            const pedido =  await pedidoService.criarPedido(usuarioId, dados)
            
            return res.status(201).json({message: 'Pedido criado com sucesso.', pedido})
        }catch(err){
            next(err)
        }
    }

    async buscarPedido(req:Request, res:Response, next:NextFunction){
        try{
            const id = Number(req.params.id)
            const pedido = await pedidoService.buscarPedido(id)

            return res.status(200).json({message: 'Pedido encontrado', pedido})
        }catch(err){
            next(err)
        }
    }

    async listar(req: Request, res:Response, next:NextFunction){
        try{
            const pedidos = await pedidoService.listar()
            return res.status(200).json({message: 'Pedidos: ', pedidos})
        }catch(err){
            next(err)
        }
    }

    async atualizarPedido(req:Request, res:Response, next:NextFunction){
        try{
            const usuarioId = (req as any).usuario.id
            const {id} = req.params
            const Numeroid = Number(id)

            const pedido = await pedidoService.buscarPedido(Numeroid)

            const validar = atualizarPedidoSchema.safeParse(req.body)
            if(!validar.success)throw validar.error
            const dados = validar.data
            
            if(pedido.usuario.id !== usuarioId){
                throw new UnauthorizedError('Você não pode atualizar esse pedido')
            }
            const pedidoAtualizado = await pedidoService.atualizarPedido(Numeroid, dados)

            return res.status(200).json({message: 'Pedido atualizado com sucesso.', pedidoAtualizado})
        }catch(err){
            console.log(err)
            next(err)
        }
    }

    async deletarPedido(req:Request, res:Response, next:NextFunction){
        try{
            const usuarioId = (req as any).usuario.id
            const {id} = req.params
            const numeroId = Number(id)
            const pedido = await pedidoService.buscarPedido(numeroId)
            if(usuarioId !== pedido.usuario.id){
                throw new UnauthorizedError('Você não pode deletar esse pedido.')
            }
            await pedidoService.deletarPedido(numeroId)
            return res.status(200).json({message: 'Pedido deletado com sucesso.'})
        }catch(err){
            next(err)
        }
    }
}