import z from "zod";

export const criarPedidoSchema = z.object({
    usuarioId: z.number(),
    produtoId: z.number(),
    quantidade: z.number().int().positive()
})