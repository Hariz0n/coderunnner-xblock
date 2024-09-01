import { z } from "zod";

export const problemSchema = z.object({
  code: z.string().min(1, 'Введите код')
})

export type problemSchemaType = z.infer<typeof problemSchema>