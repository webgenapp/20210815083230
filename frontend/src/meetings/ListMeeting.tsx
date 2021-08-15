import React from 'react'
import { useQueryClient, useQuery, useMutation } from 'react-query'
import client from '../api'
import { Meeting } from '../types'
import { useHistory } from 'react-router-dom'

type MeetingPreviewProps = {
  meeting: Meeting
  handleEdit: (meeting: Meeting) => void
  handleDelete: (meeting: Meeting) => void
  handleDetail: (meeting: Meeting) => void
}

function MeetingPreview({
  meeting,
  handleEdit,
  handleDelete,
  handleDetail,
}: MeetingPreviewProps) {
  return (
    <>
      {meeting.name}
      <br />
      <button type='button' onClick={() => handleDetail(meeting)}>
        detail
      </button>
      <button type='button' onClick={() => handleEdit(meeting)}>
        edit
      </button>
      <button type='button' onClick={() => handleDelete(meeting)}>
        delete
      </button>
    </>
  )
}

function ListMeetings() {
  const history = useHistory()
  const queryClient = useQueryClient() // eslint-disable-line no-unused-vars
  const meetingsQuery = useQuery<Meeting[]>('meetings', () => {
    return client
      .get('/api/v1/meetings')
      .then((response) => response.data) as Promise<Meeting[]>
  })

  const deleteMeeting = useMutation<any, any, Partial<Meeting>>(
    ({ id }) => {
      return client.delete(`/api/v1/meetings/${id}`)
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('meetings')
      },
    }
  )

  const handleEdit = ({ id }: Meeting) => {
    history.push(`/meetings/update/${id}`)
  }

  const handleDelete = ({ id }: Meeting) => {
    deleteMeeting.mutate({ id })
  }

  const handleDetail = ({ id }: Meeting) => {
    history.push(`/meetings/detail/${id}`)
  }

  return (
    <>
      <p>{meetingsQuery.data?.length} meetings</p>
      <ul>
        {meetingsQuery.data?.map((meeting) => (
          <li key={meeting.id}>
            <MeetingPreview
              meeting={meeting}
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

export default ListMeetings
