import { NotFoundError, SessionContext } from "blitz"
import db, { FindOneResponseArgs } from "db"

type GetResponseInput = {
  where: FindOneResponseArgs["where"]
  // Only available if a model relationship exists
  // include?: FindOneResponseArgs['include']
}

export default async function getResponse(
  { where /* include */ }: GetResponseInput,
  ctx: { session?: SessionContext } = {}
) {
  ctx.session!.authorize()

  const response = await db.response.findOne({ where })

  if (!response) throw new NotFoundError()

  return response
}
