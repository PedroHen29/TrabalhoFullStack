import { AppDataSource } from "../database/dataSource";
import { Usuarios } from "../models/Usuario";
import { CriarUsuarioDTO } from "../dtos/CriarUsuarioDTO";
import { AtualizarUsuarioDTO } from "../dtos/AtualizarUsuarioDTO";
import { NotFoundError } from "../errors/AppError";
import { ConflictError } from "../errors/AppError";
import bcrypt from 'bcryptjs'
import { email } from "zod";

const usuarioRepository = AppDataSource.getRepository(Usuarios)

export class UsuarioService {

    async criarUsuario(dados: CriarUsuarioDTO) {
        const usuarioExiste = await usuarioRepository.findOne({where: {email:dados.email}})
        if(usuarioExiste){
            throw new ConflictError('Email já existente.')
        }
        const senhaCriptografada = await bcrypt.hash(dados.senha, 10)

        const novosDados = {
            ...dados,
            senha: senhaCriptografada
        }

        const usuario = usuarioRepository.create(novosDados)

        await usuarioRepository.save(usuario)

        return usuario
    }

    async buscarUsuario(id: number) {

        const usuario = await usuarioRepository.findOne({
            where: { id: id }
        })

        if (!usuario) {
            throw new NotFoundError('Usuario não encontrado.')
        }

        return usuario
    }

    async atualizarUsuario(id: number, dados: AtualizarUsuarioDTO) {

        const usuario = await usuarioRepository.findOne({
            where: { id: id }
        })

        if (!usuario) {
            throw new NotFoundError('Usuario não encontrado.')
        }

        const novosDados = { ...dados }

        if (novosDados.senha) {
            novosDados.senha = await bcrypt.hash(novosDados.senha, 10)
        }

        const novoUsuario = Object.assign(usuario, novosDados)

        await usuarioRepository.save(novoUsuario)

        return novoUsuario
    }

    async deletarUsuario(id: number) {

        const usuario = await usuarioRepository.findOne({
            where: { id: id }
        })

        if (!usuario) {
            throw new NotFoundError('Usuario não encontrado')
        }

        await usuarioRepository.delete(id)
    }

}