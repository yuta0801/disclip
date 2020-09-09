import React, { Suspense } from "react"
import Layout from "app/layouts/Layout"
import { Head, Link, useRouter, useQuery, useParam, BlitzPage } from "blitz"
import getThread from "app/threads/queries/getThread"
import updateThread from "app/threads/mutations/updateThread"
import ThreadForm from "app/threads/components/ThreadForm"

export const EditThread = () => {
  const router = useRouter()
  const threadId = useParam("threadId", "number")
  const [thread, { mutate }] = useQuery(getThread, { where: { id: threadId } })

  return (
    <div>
      <h1>Edit Thread {thread.id}</h1>
      <pre>{JSON.stringify(thread)}</pre>

      <ThreadForm
        initialValues={thread}
        onSubmit={async () => {
          try {
            const updated = await updateThread({
              where: { id: thread.id },
              data: { name: "MyNewName" },
            })
            mutate(updated)
            alert("Success!" + JSON.stringify(updated))
            router.push("/threads/[threadId]", `/threads/${updated.id}`)
          } catch (error) {
            console.log(error)
            alert("Error creating thread " + JSON.stringify(error, null, 2))
          }
        }}
      />
    </div>
  )
}

const EditThreadPage: BlitzPage = () => {
  return (
    <div>
      <Head>
        <title>Edit Thread</title>
      </Head>

      <main>
        <Suspense fallback={<div>Loading...</div>}>
          <EditThread />
        </Suspense>

        <p>
          <Link href="/threads">
            <a>Threads</a>
          </Link>
        </p>
      </main>
    </div>
  )
}

EditThreadPage.getLayout = (page) => <Layout title={"Edit Thread"}>{page}</Layout>

export default EditThreadPage