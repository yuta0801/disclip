import { SessionContext } from "blitz"
import db, { ThreadCreateArgs } from "db"
import { ThreadInput, ThreadInputType } from "../validations"

export default async function createThread(
  input: ThreadInputType,
  ctx: { session?: SessionContext } = {}
) {
  const { title, messages } = ThreadInput.parse(input)

  const thread = await db.thread.create({
    data: {
      title,
      responses: {
        create: messages.map((content, index) => ({ content, order: index })),
      },
    },
  })

  return thread
}
