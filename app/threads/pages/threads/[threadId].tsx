import React, { Suspense } from "react"
import Layout from "app/layouts/Layout"
import { Head, Link, useRouter, useQuery, useParam, BlitzPage } from "blitz"
import getThread from "app/threads/queries/getThread"
import deleteThread from "app/threads/mutations/deleteThread"

export const Thread = () => {
  const router = useRouter()
  const threadId = useParam("threadId", "number")
  const [thread] = useQuery(getThread, { where: { id: threadId } })

  return (
    <div>
      <h1>Thread {thread.id}</h1>
      <pre>{JSON.stringify(thread, null, 2)}</pre>

      <Link href="/threads/[threadId]/edit" as={`/threads/${thread.id}/edit`}>
        <a>Edit</a>
      </Link>

      <button
        type="button"
        onClick={async () => {
          if (window.confirm("This will be deleted")) {
            await deleteThread({ where: { id: thread.id } })
            router.push("/threads")
          }
        }}
      >
        Delete
      </button>
    </div>
  )
}

const ShowThreadPage: BlitzPage = () => {
  return (
    <div>
      <Head>
        <title>Thread</title>
      </Head>

      <main>
        <p>
          <Link href="/threads">
            <a>Threads</a>
          </Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <Thread />
        </Suspense>
      </main>
    </div>
  )
}

ShowThreadPage.getLayout = (page) => <Layout title={"Thread"}>{page}</Layout>

export default ShowThreadPage