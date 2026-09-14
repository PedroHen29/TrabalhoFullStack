import z from "zod";

export const criarPedidoSchema = z.object({
    usuarioId: z.number(),
    produtoId: z.number(),
    quantidade: z.number().positive(),
})
export type CriarPedidoDTO = z.infer<typeof criarPedidoSchema>

export const atualizarPedidoSchema = z.object({
    valorTotal: z.number().optional(),
    quantidade: z.number().positive().optional(),
    data: z.date().optional(),
})
export type AtualizarPedidoDTO = z.infer<typeof atualizarPedidoSchema>