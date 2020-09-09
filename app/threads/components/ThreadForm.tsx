import React from "react"
import { LabeledTextField } from "app/components/LabeledTextField"
import { Form, FORM_ERROR } from "app/components/Form"
import { CreateThreadInput, CreateThreadInputType } from "../validations"

type ThreadFormProps = {
  onSubmit(values: CreateThreadInputType): Promise<void>
}

const ThreadForm = (props: ThreadFormProps) => {
  return (
    <Form<CreateThreadInputType>
      submitText="作成"
      schema={CreateThreadInput}
      onSubmit={async (values) => {
        try {
          await props.onSubmit(values)
        } catch (error) {
          if (error.name === "AuthenticationError") {
            return { [FORM_ERROR]: "Sorry, those credentials are invalid" }
          } else {
            return {
              [FORM_ERROR]:
                "Sorry, we had an unexpected error. Please try again. - " + error.toString(),
            }
          }
        }
      }}
    >
      <LabeledTextField name="title" label="タイトル" placeholder="タイトル" />
      <LabeledTextField name="message" label="メッセージ" placeholder="メッセージ" />
    </Form>
  )
}

export default ThreadForm
