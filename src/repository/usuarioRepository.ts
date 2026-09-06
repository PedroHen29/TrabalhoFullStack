import { AppDataSource } from "../database/dataSource";
import { CriarUsuarioDTO } from "../dtos/usuarioDTO";
import { Usuarios } from "../models/Usuario";


const repo = AppDataSource.getRepository(Usuarios)

export const usuarioRepository = {
    async criar(dados: CriarUsuarioDTO){
        const usuario = repo.create(dados)
        return await repo.save(usuario)
    },

    async listarTodos(){
        return repo.find()
    },

    async buscarPeloEmail(email: string){
        return repo.findOne({where: {email: email}})
    },

    async buscarPeloId(id: number){
        const usuario = repo.findOne({where: {id: id}})
        return usuario
    },

    async salvar(usuario: Usuarios){
        await repo.save(usuario)
    },

    async deletar(id: number){
        return repo.delete(id)
    }
}