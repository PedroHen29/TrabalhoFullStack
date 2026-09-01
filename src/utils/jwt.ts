import jwt from "jsonwebtoken"
import * as dotenv from 'dotenv'

dotenv.config()
interface Payload {
    id: number
    email: string
}

// Gera um token
//Ele precisa que passemos as informações do usuario (id, por exemplo)
// Payload é a parte do token que carrega os dados do usuario logado
export function generateToken(payload: Payload) {
    // chama o metodo da bliblioteca do JWT 'sign'
    // O sign precisa que passemos, nessa ordem:
    //1 - payload
    //2 - segredo, que vem pelo dotenv
    //3 - um objeto com o atributo 'expirenIn' que carrega a informação do dotenv
    return jwt.sign(payload, process.env.JWT_SECRET!, {
        expiresIn: Number(process.env.JWT_EXPIRES_IN)
    })
}

// recebe um token ja gerado e verifica se é valido
export function verifyToken(token: string) {
    // dentro de try catch
    // chamamos o metodo da biblioteca do jwt 'verify'
    // ele precisa que passemos:
    // -1 o proprio token
    // 2- o segredo
    try {
        return jwt.verify(token, process.env.JWT_SECRET!)
    } catch {
        return null
    }
}