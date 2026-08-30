import z from "zod";

export const pedidoParamsSchema = z.object({
    id: z.coerce.number()
})