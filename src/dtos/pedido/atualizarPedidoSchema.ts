import z from "zod";

export const atualizarPedidoSchema = z.object({
    data: z.coerce.date()
        .optional(),
    valorTotal: z.number()
            .optional(),
    usuarioId: z.number()
            .optional()
})