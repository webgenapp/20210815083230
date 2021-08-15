import React from 'react'
import { useQueryClient, useQuery, useMutation } from 'react-query'
import client from '../api'
import { Fruit } from '../types'
import { useHistory } from 'react-router-dom'

type FruitPreviewProps = {
  fruit: Fruit
  handleEdit: (fruit: Fruit) => void
  handleDelete: (fruit: Fruit) => void
  handleDetail: (fruit: Fruit) => void
}

function FruitPreview({
  fruit,
  handleEdit,
  handleDelete,
  handleDetail,
}: FruitPreviewProps) {
  return (
    <>
      {fruit.name}
      <br />
      <button type='button' onClick={() => handleDetail(fruit)}>
        detail
      </button>
      <button type='button' onClick={() => handleEdit(fruit)}>
        edit
      </button>
      <button type='button' onClick={() => handleDelete(fruit)}>
        delete
      </button>
    </>
  )
}

function ListFruits() {
  const history = useHistory()
  const queryClient = useQueryClient() // eslint-disable-line no-unused-vars
  const fruitsQuery = useQuery<Fruit[]>('fruits', () => {
    return client
      .get('/api/v1/fruits')
      .then((response) => response.data) as Promise<Fruit[]>
  })

  const deleteFruit = useMutation<any, any, Partial<Fruit>>(
    ({ id }) => {
      return client.delete(`/api/v1/fruits/${id}`)
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('fruits')
      },
    }
  )

  const handleEdit = ({ id }: Fruit) => {
    history.push(`/fruits/update/${id}`)
  }

  const handleDelete = ({ id }: Fruit) => {
    deleteFruit.mutate({ id })
  }

  const handleDetail = ({ id }: Fruit) => {
    history.push(`/fruits/detail/${id}`)
  }

  return (
    <>
      <p>{fruitsQuery.data?.length} fruits</p>
      <ul>
        {fruitsQuery.data?.map((fruit) => (
          <li key={fruit.id}>
            <FruitPreview
              fruit={fruit}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
              handleDetail={handleDetail}
            />
          </li>
        ))}
      </ul>
    </>
  )
}

export default ListFruits
