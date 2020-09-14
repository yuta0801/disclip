import * as z from "zod"

export const ThreadInput = z.object({
  title: z.string(),
  messages: z.array(z.string()),
})
export type ThreadInputType = z.infer<typeof ThreadInput>
