import React from "react"
import { LabeledTextField } from "app/components/LabeledTextField"
import { Form, FORM_ERROR } from "app/components/Form"
import { Thread, ThreadType } from "../validations"

type ThreadFormProps = {
  submitText: string
  initialValues?: Partial<ThreadType>
  onSubmit(values: ThreadType): Promise<void>
}

const ThreadForm = (props: ThreadFormProps) => {
  return (
    <Form<ThreadType>
      submitText={props.submitText}
      schema={Thread}
      initialValues={props.initialValues}
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
