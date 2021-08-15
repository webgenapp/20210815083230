import client from '../api'
import { FormikHelpers } from 'formik'
import React from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { Fruit, FruitError } from '../types'
import FruitForm from './FruitForm'
import { useHistory } from 'react-router-dom'

function CreateFruit() {
  const queryClient = useQueryClient()
  const history = useHistory()
  const createFruit = useMutation<Fruit, FruitError, Fruit>(
    (values) => {
      return client.post('/api/v1/fruits', values)
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('fruits')
      },
    }
  )

  const handleSubmit = (
    values: Fruit,
    { setSubmitting }: FormikHelpers<Fruit>
  ) => {
    createFruit.mutate(values)
    setSubmitting?.(false)
    history.push('/fruits')
  }

  return <FruitForm onSubmit={handleSubmit} />
}

export default CreateFruit
