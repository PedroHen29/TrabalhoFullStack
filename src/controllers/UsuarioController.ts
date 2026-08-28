import { Request, Response, NextFunction } from "express";
import { UsuarioService } from "../services/UsuarioService";
import { CriarUsuarioSchema } from "../dtos/criarUsuarioSchema";
import { AtualizarUsuarioSchema } from "../dtos/atualizarUsuarioSchema";
import { BadRequestError } from "../errors/AppError";

const usuarioService = new UsuarioService()

export class UsuarioController {

    async criarUsuario(req: Request, res: Response, next: NextFunction) {

        try {

            const validar = CriarUsuarioSchema.safeParse(req.body)

            if (validar.success === true) {

                const dados = validar.data

                const usuario = await usuarioService.criarUsuario(dados)

                return res.status(201).json({
                    message: 'Usuario criado com sucesso.',
                    usuario
                })

            } else {

                return res.status(400).json({
                    message: 'Erro ao tentar criar o usuario.'
                })

            }

        } catch (err) {

            next(err)

        }

    }

    async buscarUsuario(req: Request, res: Response, next: NextFunction) {

        try {

            const id = Number(req.params.id)

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

            const id = Number(req.params.id)

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

            const id = Number(req.params.id)

            await usuarioService.deletarUsuario(id)

            return res.status(200).json({
                message: 'Usuario deletado com sucesso.'
            })

        } catch (err) {

            next(err)

        }

    }

}