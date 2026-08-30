import z from "zod";

export const criarProdutoSchema = z.object({
    nome: z.string().min(3, 'Nome precisa ter no minino 3 caracteres'),
    preco: z.number().positive(),
    estoque: z.number().nonnegative().int()
})