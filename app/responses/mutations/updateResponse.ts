import { SessionContext } from "blitz"
import db, { ResponseUpdateArgs } from "db"

type UpdateResponseInput = {
  where: ResponseUpdateArgs["where"]
  data: ResponseUpdateArgs["data"]
}

export default async function updateResponse(
  { where, data }: UpdateResponseInput,
  ctx: { session?: SessionContext } = {}
) {
  ctx.session!.authorize()

  const response = await db.response.update({ where, data })

  return response
}
