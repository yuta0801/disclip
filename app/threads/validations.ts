import * as z from "zod"

export const Thread = z.object({
  title: z.string(),
  message: z.string(),
})
export type ThreadType = z.infer<typeof Thread>
