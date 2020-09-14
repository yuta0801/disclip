import { SessionContext } from "blitz"
import db, { FindManyThreadArgs } from "db"

type GetThreadsInput = {
  where?: FindManyThreadArgs["where"]
  orderBy?: FindManyThreadArgs["orderBy"]
  skip?: FindManyThreadArgs["skip"]
  take?: FindManyThreadArgs["take"]
  // Only available if a model relationship exists
  // include?: FindManyThreadArgs['include']
}

export default async function getThreads(
  { where, orderBy, skip = 0, take }: GetThreadsInput,
  ctx: { session?: SessionContext } = {}
) {
  const threads = await db.thread.findMany({
    where,
    orderBy,
    take,
    skip,
  })

  const count = await db.thread.count()
  const hasMore = typeof take === "number" ? skip + take < count : false
  const nextPage = hasMore ? { take, skip: skip + take! } : null

  return {
    threads,
    nextPage,
    hasMore,
  }
}
