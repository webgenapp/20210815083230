import React from 'react'
import { useParams } from 'react-router-dom'
import client from '../api'
import { useQuery } from 'react-query'
import { Meeting } from '../types'

function DetailMeeting() {
  const { id } = useParams<{ id: string }>()

  const { data, isLoading } = useQuery<Meeting>(['meetings', id], () =>
    client.get(`/api/v1/meetings/${id}`).then((response) => response.data)
  )

  if (isLoading) {
    return <div>Loading...</div>
  }

  const meeting = data as Meeting

  return (
    <div>
      <label>{meeting.name}</label>
      <br />
    </div>
  )
}

export default DetailMeeting
