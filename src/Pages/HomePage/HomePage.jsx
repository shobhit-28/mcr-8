import { useContext, useState } from "react"
import { DataContext } from "../../context/dataContext"
import { useNavigate } from "react-router-dom"

export const HomePage = () => {
  const {data} = useContext(DataContext)
  
  const [filteredData, setFilteredData] = useState(data)

  const navigate = useNavigate()

  const filter = (val) => {
    switch (val) {
      case 'online':
        setFilteredData(data.filter(({eventType}) => eventType === 'Online' ))
        break;
      case 'offline':
        setFilteredData(data.filter(({eventType}) => eventType === 'Offline' ))
        break;
      case 'both':
        setFilteredData(data)
        break;
    
      default:
        break;
    }
  }
  return (
    <div className="pt-16">
      <div className="top flex items-center justify-between px-4 py-2">
        <p className="text-3xl font-medium">Meetup Events</p>
        <select name="" id="" className="border-2 p-2 rounded" onChange={(event) => filter(event.target.value) }>
          <option value="online" className="">Online</option>
          <option value="offline" className="">Offline</option>
          <option value="both" className="">Both</option>
        </select>
      </div>
      <div className="flex flex-wrap">
        {filteredData.map((meeting) => (
          <div className="w-72 m-2 relative box-shadow cursor-pointer flex flex-col justify-between" key={meeting.id} onClick={() => navigate(`/meeting/${meeting.id}`)}>
            <div className="">
              <img src={meeting.eventThumbnail} alt="" />
            </div>
            <div className="">
              <p className="bg-white/80 rounded absolute top-2 left-2 p-1">{`${meeting.eventType} event`}</p>
              <p className="mx-2 mt-2 ">{new Date(meeting.eventStartTime).toDateString()}</p>
              <p className="mx-2 mb-2 font-semibold text-xl">{meeting.title}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
