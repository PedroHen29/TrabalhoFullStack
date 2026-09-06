import z from "zod";

export const criarProdutoSchema = z.object({
    nome: z.string(),
    preco: z.number()
        .positive('Preço não pode ser negativo.'),
    estoque: z.number()
        .positive()
})
export type CriarProdutoDTO = z.infer<typeof criarProdutoSchema>

export const atualizarProdutoSchema = z.object({
    nome: z.string().optional(),
    preco: z.number()
        .positive('Preço não pode ser negativo.')
        .optional(),
    estoque: z.number()
        .positive()
        .optional()
})
export type AtualizarProdutoDTO = z.infer<typeof atualizarProdutoSchema>