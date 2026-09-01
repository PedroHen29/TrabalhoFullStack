import { Usuarios } from "../models/Usuario"

// Remove a senha do objeto de usuário antes de retornar para o cliente
export function omitPassword(usuario: Usuarios) {
    const { senha, ...usuarioSemSenha } = usuario
    return usuarioSemSenha
}
