import { NotFoundError, SessionContext } from "blitz"
import db, { FindOneThreadArgs } from "db"

type GetThreadInput = {
  where: FindOneThreadArgs["where"]
  include?: FindOneThreadArgs["include"]
}

export default async function getThread(
  { where }: GetThreadInput,
  ctx: { session?: SessionContext } = {}
) {
  const thread = await db.thread.findOne({ where, include: { responses: true } })

  if (!thread) throw new NotFoundError()

  return thread
}
