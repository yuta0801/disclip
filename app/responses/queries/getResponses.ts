import { SessionContext } from "blitz"
import db, { FindManyResponseArgs } from "db"

type GetResponsesInput = {
  where?: FindManyResponseArgs["where"]
  orderBy?: FindManyResponseArgs["orderBy"]
  skip?: FindManyResponseArgs["skip"]
  take?: FindManyResponseArgs["take"]
  // Only available if a model relationship exists
  // include?: FindManyResponseArgs['include']
}

export default async function getResponses(
  { where, orderBy, skip = 0, take }: GetResponsesInput,
  ctx: { session?: SessionContext } = {}
) {
  ctx.session!.authorize()

  const responses = await db.response.findMany({
    where,
    orderBy,
    take,
    skip,
  })

  const count = await db.response.count()
  const hasMore = typeof take === "number" ? skip + take < count : false
  const nextPage = hasMore ? { take, skip: skip + take! } : null

  return {
    responses,
    nextPage,
    hasMore,
  }
}
