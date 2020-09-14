import { SessionContext } from "blitz"
import db, { ThreadCreateArgs } from "db"
import { ThreadInputType } from "../validations"

export default async function createThread(
  { title, messages }: ThreadInputType,
  ctx: { session?: SessionContext } = {}
) {
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
