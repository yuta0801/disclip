import { SessionContext } from "blitz"
import db, { ResponseCreateArgs } from "db"

type CreateResponseInput = {
  data: ResponseCreateArgs["data"]
}
export default async function createResponse(
  { data }: CreateResponseInput,
  ctx: { session?: SessionContext } = {}
) {
  ctx.session!.authorize()

  const response = await db.response.create({ data })

  return response
}
