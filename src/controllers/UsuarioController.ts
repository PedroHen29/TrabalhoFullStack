import { Request, Response, NextFunction } from "express";
import { UsuarioService } from "../services/UsuarioService";
import { CriarUsuarioSchema } from "../dtos/usuario/criarUsuarioSchema";
import { AtualizarUsuarioSchema } from "../dtos/usuario/atualizarUsuarioSchema";
import { BadRequestError } from "../errors/AppError";
import { usuarioParamsSchema } from "../dtos/usuario/usuarioParamsSchema";

const usuarioService = new UsuarioService()

export class UsuarioController {

    async criarUsuario(req: Request, res: Response, next: NextFunction) {
    try {

        const validar = CriarUsuarioSchema.safeParse(req.body)

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

    async buscarUsuario(req: Request, res: Response, next: NextFunction) {

        try {
            const validar = usuarioParamsSchema.parse(req.params)
            const  {id}   = validar
            const usuario = await usuarioService.buscarUsuario(id)

            return res.status(200).json({
                message: 'Usuario encontrado',
                usuario
            })

        } catch (err) {

            next(err)

        }

    }

    async atualizarUsuario(req: Request, res: Response, next: NextFunction) {

        try {

           const validarId = usuarioParamsSchema.parse(req.params)
            const  {id}   = validarId

            const validar = AtualizarUsuarioSchema.safeParse(req.body)

            if (!validar.success) {
                throw new BadRequestError("Dados inválidos.")
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
            const validar = usuarioParamsSchema.parse(req.params)
            const  {id}   = validar

            await usuarioService.deletarUsuario(id)

            return res.status(200).json({
                message: 'Usuario deletado com sucesso.'
            })

        } catch (err) {

            next(err)

        }

    }

}