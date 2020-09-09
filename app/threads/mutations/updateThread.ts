import { SessionContext } from "blitz"
import db, { ThreadUpdateArgs } from "db"

type UpdateThreadInput = {
  where: ThreadUpdateArgs["where"]
  data: ThreadUpdateArgs["data"]
}

export default async function updateThread(
  { where, data }: UpdateThreadInput,
  ctx: { session?: SessionContext } = {}
) {
  const thread = await db.thread.update({ where, data, include: { responses: true } })

  return thread
}
