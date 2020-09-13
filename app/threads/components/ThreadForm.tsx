import React from "react"
import { LabeledTextField } from "app/components/LabeledTextField"
import { Form, FORM_ERROR } from "app/components/Form"
import { Thread, ThreadType } from "../validations"
import arrayMutators from "final-form-arrays"
import { FieldArray } from "react-final-form-arrays"

type ThreadFormProps = {
  submitText: string
  initialValues?: Partial<ThreadType>
  onSubmit(values: ThreadType): Promise<void>
}

const ThreadForm = (props: ThreadFormProps) => {
  return (
    <Form<ThreadType>
      mutators={{ ...arrayMutators }}
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
      <FieldArray name="messages">
        {({ fields }) => (
          <div>
            {fields.map((name, index) => (
              <div key={name}>
                <LabeledTextField name={name} label="メッセージ" placeholder="メッセージ" />
                <button type="button" onClick={() => fields.remove(index)}>
                  Remove
                </button>
              </div>
            ))}
            <button type="button" onClick={() => fields.push(undefined)}>
              Add
            </button>
          </div>
        )}
      </FieldArray>
    </Form>
  )
}

export default ThreadForm
