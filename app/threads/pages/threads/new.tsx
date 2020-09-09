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
        <h1>Create New Thread</h1>

        <ThreadForm
          onSubmit={async ({ title, message }) => {
            const thread = await createThread({
              data: { title, responses: { create: [{ content: message }] } },
            })
            alert("Success!" + JSON.stringify(thread))
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
