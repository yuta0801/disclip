import React, { Suspense } from "react"
import Layout from "app/layouts/Layout"
import { Head, Link, usePaginatedQuery, useRouter, BlitzPage } from "blitz"
import getThreads from "app/threads/queries/getThreads"

const ITEMS_PER_PAGE = 100

export const ThreadsList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ threads, hasMore }] = usePaginatedQuery(getThreads, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div>
      <ul>
        {threads.map((thread) => (
          <li key={thread.id}>
            <Link href="/threads/[threadId]" as={`/threads/${thread.id}`}>
              <a>{thread.name}</a>
            </Link>
          </li>
        ))}
      </ul>

      <button disabled={page === 0} onClick={goToPreviousPage}>
        Previous
      </button>
      <button disabled={!hasMore} onClick={goToNextPage}>
        Next
      </button>
    </div>
  )
}

const ThreadsPage: BlitzPage = () => {
  return (
    <div>
      <Head>
        <title>Threads</title>
      </Head>

      <main>
        <h1>Threads</h1>

        <p>
          <Link href="/threads/new">
            <a>Create Thread</a>
          </Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <ThreadsList />
        </Suspense>
      </main>
    </div>
  )
}

ThreadsPage.getLayout = (page) => <Layout title={"Threads"}>{page}</Layout>

export default ThreadsPage
