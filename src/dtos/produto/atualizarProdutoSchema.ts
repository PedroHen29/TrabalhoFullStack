import z from "zod";

export const atualizarProdutoSchema = z.object({
    nome: z.string().min(3, 'Nome precisa ter no minino 3 caracteres').optional(),
    preco: z.number().positive().optional(),
    estoque: z.number().nonnegative().int().optional()
})