import { SessionContext } from "blitz"
import db, { ResponseDeleteArgs } from "db"

type DeleteResponseInput = {
  where: ResponseDeleteArgs["where"]
}

export default async function deleteResponse(
  { where }: DeleteResponseInput,
  ctx: { session?: SessionContext } = {}
) {
  ctx.session!.authorize()

  const response = await db.response.delete({ where })

  return response
}
