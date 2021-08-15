import React from 'react'
import { Formik, Field, Form, FormikHelpers } from 'formik'
import { Fruit } from '../types'

type CreateProps = {
  fruit?: Fruit
  onSubmit: (values: Fruit, helpers: FormikHelpers<Fruit>) => void
}

function FruitForm({ fruit, onSubmit }: CreateProps) {
  const initialValues: Fruit = {
    name: fruit ? fruit.name : '',
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

export default FruitForm
