import * as z from "zod"

export const CreateThreadInput = z.object({
  title: z.string(),
  message: z.string(),
})
export type CreateThreadInputType = z.infer<typeof CreateThreadInput>
