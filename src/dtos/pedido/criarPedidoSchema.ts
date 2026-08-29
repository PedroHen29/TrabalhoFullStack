import z from "zod";

export const criarPedidoSchema = z.object({
    data: z.coerce.date(),
    valorTotal: z.number(),
    usuarioId: z.number()
})