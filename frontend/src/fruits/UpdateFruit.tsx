import client from '../api'
import React from 'react'
import { useParams, useHistory } from 'react-router-dom'
import FruitForm from './FruitForm'
import { Fruit } from '../types'
import { useQuery, useMutation, useQueryClient } from 'react-query'

function UpdateFruit() {
  const { id } = useParams<{ id: string }>()
  const queryClient = useQueryClient()
  const history = useHistory()

  const { data, isLoading } = useQuery<Fruit>(['fruits', id], () =>
    client.get(`/api/v1/fruits/${id}`).then((response) => response.data)
  )

  const updateFruit = useMutation<Fruit, any, Fruit>(
    (values: Fruit) =>
      client
        .put(`/api/v1/fruits/${id}`, values)
        .then((response) => response.data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('fruits')
      },
    }
  )

  if (isLoading) {
    return <div>Loading...</div>
  }

  const fruit = data as Fruit
  return (
    <FruitForm
      fruit={fruit}
      onSubmit={(values, { setSubmitting }) => {
        updateFruit.mutate(values)
        setSubmitting?.(false)
        history.push('/fruits')
      }}
    />
  )
}

export default UpdateFruit
