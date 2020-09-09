import { SessionContext } from "blitz"
import db, { ThreadDeleteArgs } from "db"

type DeleteThreadInput = {
  where: ThreadDeleteArgs["where"]
}

export default async function deleteThread(
  { where }: DeleteThreadInput,
  ctx: { session?: SessionContext } = {}
) {
  ctx.session!.authorize()

  const thread = await db.thread.delete({ where })

  return thread
}
