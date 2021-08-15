import client from '../api'
import { FormikHelpers } from 'formik'
import React from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { Meeting, MeetingError } from '../types'
import MeetingForm from './MeetingForm'
import { useHistory } from 'react-router-dom'

function CreateMeeting() {
  const queryClient = useQueryClient()
  const history = useHistory()
  const createMeeting = useMutation<Meeting, MeetingError, Meeting>(
    (values) => {
      return client.post('/api/v1/meetings', values)
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('meetings')
      },
    }
  )

  const handleSubmit = (
    values: Meeting,
    { setSubmitting }: FormikHelpers<Meeting>
  ) => {
    createMeeting.mutate(values)
    setSubmitting?.(false)
    history.push('/meetings')
  }

  return <MeetingForm onSubmit={handleSubmit} />
}

export default CreateMeeting
