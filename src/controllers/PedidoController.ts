import { PedidoService } from "../services/PedidoService";
import { criarPedidoSchema } from "../dtos/pedido/criarPedidoSchema";
import { Request, Response, NextFunction } from "express";
import { AtualizarUsuarioSchema } from "../dtos/usuario/atualizarUsuarioSchema";
import { pedidoParamsSchema } from "../dtos/pedido/pedidoParamsSchema";
import { atualizarPedidoSchema } from "../dtos/pedido/atualizarPedidoSchema";

const pedidoService = new PedidoService()

export class PedidoController {

    async criarPedido(req:Request, res: Response, next: NextFunction){
        try{
            const validar = criarPedidoSchema.safeParse(req.body)
            if(!validar.success){
                throw validar.error
            }
            const dados = validar.data
            const pedido =  await pedidoService.criarPedido(dados)
            return res.status(201).json({message: 'Pedido criado com sucesso.', pedido})
        }catch(err){
            next(err)
        }
    }

    async buscarPedido(req:Request, res:Response, next:NextFunction){
        try{
            const validar =  pedidoParamsSchema.parse(req.params)
            const {id} = validar
            const pedido = await pedidoService.buscarPedido(id)

            return res.status(200).json({message: 'Pedido encontrado', pedido})
        }catch(err){
            next(err)
        }
    }

    async atualizarPedido(req:Request, res:Response, next:NextFunction){
        try{
            const validarId = pedidoParamsSchema.parse(req.params)
            const {id} = validarId

            const validar = atualizarPedidoSchema.safeParse(req.body)
            if(!validar.success){
                throw validar.error
            }
            const dados = validar.data
            const pedido = await pedidoService.atualizarPedido(id, dados)

            return res.status(200).json({message: 'Pedido atualizado com sucesso.', pedido})
        }catch(err){
            next(err)
        }
    }

    async deletarPedido(req:Request, res:Response, next:NextFunction){
        try{
            const validar = pedidoParamsSchema.parse(req.params)
            const {id} = validar
            await pedidoService.deletarPedido(id)

            return res.status(200).json({message: 'Pedido deletado com sucesso.'})
        }catch(err){
            next(err)
        }
    }
}