import { z } from "zod";

export const CriarUsuarioSchema = z.object({

    nome: z.string()
        .min(3, 'Nome deve ter no minimo tres letras'),

    email: z.email(),

    senha: z.string()
        .min(8, 'A senha deve conter no minimo 8 caracteres'),

    cpf: z.string()
        .length(11, 'CPF invalido'),

    telefone: z.string()

})