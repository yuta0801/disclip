import { NotFoundError, SessionContext } from "blitz"
import db, { FindOneThreadArgs } from "db"

type GetThreadInput = {
  where: FindOneThreadArgs["where"]
  // Only available if a model relationship exists
  // include?: FindOneThreadArgs['include']
}

export default async function getThread(
  { where /* include */ }: GetThreadInput,
  ctx: { session?: SessionContext } = {}
) {
  ctx.session!.authorize()

  const thread = await db.thread.findOne({ where })

  if (!thread) throw new NotFoundError()

  return thread
}
