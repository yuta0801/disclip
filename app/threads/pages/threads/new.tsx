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
          initialValues={{}}
          onSubmit={async () => {
            try {
              const thread = await createThread({ data: { name: "MyName" } })
              alert("Success!" + JSON.stringify(thread))
              router.push("/threads/[threadId]", `/threads/${thread.id}`)
            } catch (error) {
              alert("Error creating thread " + JSON.stringify(error, null, 2))
            }
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
