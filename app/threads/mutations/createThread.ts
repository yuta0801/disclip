import { SessionContext } from "blitz"
import db, { ThreadCreateArgs } from "db"

type CreateThreadInput = {
  data: ThreadCreateArgs["data"]
}
export default async function createThread(
  { data }: CreateThreadInput,
  ctx: { session?: SessionContext } = {}
) {
  const thread = await db.thread.create({ data })

  return thread
}
