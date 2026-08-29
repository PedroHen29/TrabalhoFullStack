import { z } from "zod";

export const AtualizarUsuarioSchema = z.object({

    nome: z.string()
        .min(3, 'Nome deve ter no minimo tres letras')
        .optional(),

    email: z.email()
        .optional(),

    senha: z.string()
        .min(8, 'A senha deve conter no minimo 8 caracteres')
        .optional(),

    cpf: z.string()
        .length(11, 'CPF invalido')
        .optional(),

    telefone: z.string()
        .optional()

})