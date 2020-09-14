import React from "react"
import Layout from "app/layouts/Layout"
import { Head, Link, useRouter, BlitzPage } from "blitz"
import createThread from "app/threads/mutations/createThread"
import ThreadForm from "app/threads/components/ThreadForm"

const NewThreadPage: BlitzPage = () => {
  const router = useRouter()

  return (
    <div>
      <Head>
        <title>New Thread</title>
      </Head>

      <main>
        <h1>スレッドを作成</h1>

        <ThreadForm
          submitText="作成"
          onSubmit={async ({ title, messages }) => {
            const thread = await createThread({ title, messages })
            router.push("/threads/[threadId]", `/threads/${thread.id}`)
          }}
        />

        <p>
          <Link href="/threads">
            <a>Threads</a>
          </Link>
        </p>
      </main>
    </div>
  )
}

NewThreadPage.getLayout = (page) => <Layout title={"Create New Thread"}>{page}</Layout>

export default NewThreadPage
