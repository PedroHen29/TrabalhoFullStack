import { Request, Response, NextFunction } from "express";
import { UsuarioService } from "../services/UsuarioService";
import { atualizarUsuarioSchema, CriarUsuarioDTO, criarUsuarioSchema } from "../dtos/usuarioDTO";

const usuarioService = new UsuarioService()

export class UsuarioController {

    async criarUsuario(req: Request, res: Response, next: NextFunction) {
    try {

        const validar = criarUsuarioSchema.safeParse(req.body)

        if (!validar.success) {
            throw validar.error
        }

        const dados = validar.data

        const usuario = await usuarioService.criarUsuario(dados)

        return res.status(201).json({
            message: 'Usuario criado com sucesso.',
            usuario
        })

    } catch (err) {
        next(err)
    }
}

    async loginUsuario(req: Request, res: Response, next: NextFunction){
        try{
            const {email, senha} = req.body

            const usuario = await usuarioService.loginUsuario({email, senha})
            return res.json(usuario)
        }catch(err){
            next(err)
        }
        

    }

    async buscarUsuario(req: Request, res: Response, next: NextFunction) {

        try {
            const id = Number(req.params)
            const usuario = await usuarioService.buscarUsuario(id)

            return res.status(200).json({
                message: 'Usuario encontrado',
                usuario
            })

        } catch (err) {

            next(err)

        }

    }

    async listar(req: Request, res: Response, next: NextFunction){
        try{
            const usuarios = await usuarioService.listarTodos()
            return res.status(200).json({message: 'Lista de usuario: ', usuarios})
        }catch(err){
            next(err)
        }
        
    }

    async atualizarUsuario(req: Request, res: Response, next: NextFunction) {

        try {

           const id = (req as any).usuario.id

            const validar = atualizarUsuarioSchema.safeParse(req.body)

            if (!validar.success) {
                throw validar.error
            }

            const dados = validar.data

            await usuarioService.atualizarUsuario(id, dados)

            return res.status(200).json({
                message: 'Usuario atualizado com sucesso.'
            })

        } catch (err) {

            next(err)

        }

    }

    async deletarUsuario(req: Request, res: Response, next: NextFunction) {

        try {
            const id = (req as any).usuario.id

            await usuarioService.deletarUsuario(id)

            return res.status(200).json({
                message: 'Usuario deletado com sucesso.'
            })

        } catch (err) {

            next(err)

        }

    }

}