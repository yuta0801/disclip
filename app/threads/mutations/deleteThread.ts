import { SessionContext } from "blitz"
import db from "db"

export default async function deleteThread(id: number, ctx: { session?: SessionContext } = {}) {
  ctx.session!.authorize()

  const thread = await db.thread.delete({ where: { id } })

  return thread
}
