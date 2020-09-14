import { SessionContext } from "blitz"
import db from "db"
import { ThreadInputType } from "../validations"

export default async function updateThread(
  id: number,
  { title, messages }: ThreadInputType,
  ctx: { session?: SessionContext } = {}
) {
  const thread = await db.thread.update({
    where: { id },
    data: {
      title,
      responses: {
        upsert: messages.map((message, index) => ({
          where: { threadId_order: { threadId: id, order: index } },
          create: { content: message, order: index },
          update: { content: message },
        })),
      },
    },
    include: { responses: true },
  })

  return thread
}
