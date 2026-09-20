import z from "zod";

export const criarPedidoSchema = z.object({
    itens: z.array(z.object({
        produtoId: z.number(),
        quantidade: z.number().positive()
    })).min(1) 
    
})
export type CriarPedidoDTO = z.infer<typeof criarPedidoSchema>

export const atualizarPedidoSchema = z.object({
    data: z.date().optional()
})
export type AtualizarPedidoDTO = z.infer<typeof atualizarPedidoSchema>