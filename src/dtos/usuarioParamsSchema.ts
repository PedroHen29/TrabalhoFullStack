import z from "zod";

export const usuarioParamsSchema = z.object ({
    id: z.coerce.number().int().positive()
})