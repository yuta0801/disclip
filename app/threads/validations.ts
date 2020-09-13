import * as z from "zod"

export const Thread = z.object({
  title: z.string(),
  messages: z.array(z.string()),
})
export type ThreadType = z.infer<typeof Thread>
