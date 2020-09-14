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
      <h1>編集：{thread.title}</h1>

      <ThreadForm
        submitText="更新"
        initialValues={{
          title: thread.title,
          messages: thread.responses.map(({ content }) => content),
        }}
        onSubmit={async ({ title, messages }) => {
          const updated = await updateThread({
            where: { id: thread.id },
            data: {
              title,
              responses: {
                upsert: messages.map((message, index) => ({
                  where: { threadId_order: { threadId: thread.id, order: index } },
                  create: { content: message, order: index },
                  update: { content: message },
                })),
              },
            },
          })
          mutate(updated)
          router.push("/threads/[threadId]", `/threads/${updated.id}`)
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
