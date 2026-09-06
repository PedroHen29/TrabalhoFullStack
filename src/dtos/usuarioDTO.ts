import z, { email } from "zod";

export const criarUsuarioSchema = z.object({
    nome: z.string()
        .min(3, 'Nome deve ter no minimo tres caracteres')
        .max(100, 'Nome não pode ter mais de 100 caracteres')
        .regex(/^[^0-9]*$/, 'Nome não pode ter numeros'),
    email: z.email(),

    senha: z.string()
            .min(8, { message: "A senha deve ter no mínimo 8 caracteres." })
            .max(100, { message: "A senha é muito longa." })
            .regex(/[A-Z]/, { message: "Deve conter pelo menos uma letra maiúscula." })
            .regex(/[a-z]/, { message: "Deve conter pelo menos uma letra minúscula." }),
    
})
export type CriarUsuarioDTO = z.infer<typeof criarUsuarioSchema>

export const atualizarUsuarioSchema = z.object({
    nome: z.string()
        .min(3, 'Nome deve ter no minimo tres caracteres')
        .max(100, 'Nome não pode ter mais de 100 caracteres')
        .regex(/^[^0-9]*$/, 'Nome não pode ter numeros')
        .optional(),
    email: z.email().optional(),

    senha: z.string()
            .min(8, { message: "A senha deve ter no mínimo 8 caracteres." })
            .max(100, { message: "A senha é muito longa." })
            .regex(/[A-Z]/, { message: "Deve conter pelo menos uma letra maiúscula." })
            .regex(/[a-z]/, { message: "Deve conter pelo menos uma letra minúscula." })
            .optional()
})
export type AtualizarUsuarioDTO = z.infer<typeof atualizarUsuarioSchema>