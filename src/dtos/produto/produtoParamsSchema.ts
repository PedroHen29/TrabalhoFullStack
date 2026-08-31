import z from "zod";

export const produtoParamsSchema = z.object({
    id: z.coerce.number().positive().int()
})