import client from '../api'
import React from 'react'
import { useParams, useHistory } from 'react-router-dom'
import MeetingForm from './MeetingForm'
import { Meeting } from '../types'
import { useQuery, useMutation, useQueryClient } from 'react-query'

function UpdateMeeting() {
  const { id } = useParams<{ id: string }>()
  const queryClient = useQueryClient()
  const history = useHistory()

  const { data, isLoading } = useQuery<Meeting>(['meetings', id], () =>
    client.get(`/api/v1/meetings/${id}`).then((response) => response.data)
  )

  const updateMeeting = useMutation<Meeting, any, Meeting>(
    (values: Meeting) =>
      client
        .put(`/api/v1/meetings/${id}`, values)
        .then((response) => response.data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('meetings')
      },
    }
  )

  if (isLoading) {
    return <div>Loading...</div>
  }

  const meeting = data as Meeting
  return (
    <MeetingForm
      meeting={meeting}
      onSubmit={(values, { setSubmitting }) => {
        updateMeeting.mutate(values)
        setSubmitting?.(false)
        history.push('/meetings')
      }}
    />
  )
}

export default UpdateMeeting
