import React from 'react'
import { Formik, Field, Form, FormikHelpers } from 'formik'
import { Meeting } from '../types'

type CreateProps = {
  meeting?: Meeting
  onSubmit: (values: Meeting, helpers: FormikHelpers<Meeting>) => void
}

function MeetingForm({ meeting, onSubmit }: CreateProps) {
  const initialValues: Meeting = {
    name: meeting ? meeting.name : '',
  }

  return (
    <Formik
      initialValues={initialValues}
      validate={() => {
        return {}
      }}
      onSubmit={onSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          <Field type='text' name='name' placeholder='Name' />

          <button type='submit' disabled={isSubmitting}>
            Submit
          </button>
        </Form>
      )}
    </Formik>
  )
}

export default MeetingForm
