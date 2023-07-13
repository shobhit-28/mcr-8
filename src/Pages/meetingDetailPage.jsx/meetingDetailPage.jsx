import { useParams } from "react-router-dom"

export const MeetingDetailPage = () => {
    const {meetingDetail} = useParams()

  return (
    <div>MeetingDetailPage {meetingDetail}</div>
  )
}
