import { useContext, useState } from "react"
import { useParams } from "react-router-dom"
import { DataContext } from "../../context/dataContext"

import { BiTimeFive } from 'react-icons/bi'
import { TfiLocationPin } from 'react-icons/tfi'
import { BsCurrencyRupee } from "react-icons/bs"

export const MeetingDetailPage = () => {
    const { meetingDetail } = useParams()

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [rsvpData, setRsvpData] = useState({
        name: '',
        email: ''
    })

    const { data, setData } = useContext(DataContext)

    const meeting = data.find(({ id }) => id === meetingDetail)

    const rsvpClickHandler = () => {
        if (rsvpData.name.length > 0) {
            if (rsvpData.email.length > 0) {
                setData(data.map((meeting) => meeting.id === meetingDetail ? { ...meeting, isRSVP: true } : meeting))
            } else {
                alert(`Email is necessary`)
            }
        } else {
            alert(`Name is necessary`)
        }
        setIsModalOpen(false)
    }

    return (
        <div className="pt-16 pb-10 flex justify-evenly">
            <div className="px-2 w-3/5">
                <p className="text-3xl font-semibold">{meeting.title}</p>
                <p className="py-3"><span className="block text-sm">Hosted by:-</span><span className="block font-medium text-lg">{meeting.hostedBy}</span></p>
                <div className="">
                    <img src={meeting.eventThumbnail} alt={meeting.title} />
                </div>
                <p className="py-3"><span className="block font-medium text-lg">Details:-</span><span className="block">{meeting.eventDescription}</span></p>
                <p className="py-1"><span className="block font-medium text-lg">Additional Info:-</span></p>
                <p className=""><span className="font-medium mr-1">Dress Code: </span><span className="">{meeting.additionalInformation.dressCode}</span></p>
                <p className=""><span className="font-medium mr-1">Age Restrictions: </span><span className="">{meeting.additionalInformation.ageRestrictions}</span></p>
            </div>
            <div className="px-2 mt-28">
                <div className="box-shadow p-2">
                    <div className="flex items-center">
                        <BiTimeFive className="mr-1" />
                        <p className="">
                            <span className="mr-1">{new Date(meeting.eventStartTime).toDateString()}</span>
                            at
                            <span className="mx-1">{new Date(meeting.eventStartTime).toLocaleTimeString()}</span>
                            to
                            <span className="block">
                                <span className="mr-1">{new Date(meeting.eventEndTime).toDateString()}</span>
                                at
                                <span className="mx-1">{new Date(meeting.eventEndTime).toLocaleTimeString()}</span>
                            </span>
                        </p>
                    </div>
                    <div className="flex items-center">
                        <TfiLocationPin className="mr-1" />
                        <p className="">
                            <span className="">{meeting.location}</span>
                            <span className="block">{meeting.address}</span>
                        </p>
                    </div>
                    {meeting.price !== 'Free' &&
                        <div className="flex items-center">
                            <BsCurrencyRupee className="mr-1" />
                            <p className="">{meeting.price}</p>
                        </div>
                    }
                </div>
                <p className="py-1 mt-6"><span className="mr-1 font-medium text-lg">Speakers:</span>({meeting?.speakers?.length})</p>
                <div className="flex flex-wrap">
                    {meeting.speakers.map((speaker, index) => (
                        <div className="box-shadow p-2 m-2 text-center" key={index}>
                            <div className="rounded-full overflow-hidden w-20 h-20 flex justify-center items-center m-auto">
                                <img src={speaker.image} alt={speaker.name} className="h-full" />
                            </div>
                            <p className="mt-2">{speaker.name}</p>
                            <p className="text-sm">{speaker.designation}</p>
                        </div>
                    ))}
                </div>
                {meeting.isRSVP
                    ?
                    <button className="bg-[#f64060]/50 p-2 w-48 text-white rounded-lg block m-auto mt-6 cursor-not-allowed active:scale-100" disabled>Already RSVPed</button>
                    :
                    <button className="bg-[#f64060] p-2 w-32 text-white rounded-lg block m-auto mt-6" onClick={() => setIsModalOpen(true)}>RSVP</button>
                }
            </div>
            {isModalOpen &&
                <div className="fixed top-0 bg-white/25 flex justify-center items-center h-screen w-screen z-30" onClick={() => setIsModalOpen(false)}>
                    <div className="bg-white z-40 p-3 rounded" onClick={(event) => event.stopPropagation()}>
                        <p className="text-xl font-medium">
                            Complete your RSVP
                        </p>
                        <p className="text-lg">
                            Fill in your personal information.
                        </p>
                        <label htmlFor="name" className="mt-2 block">
                            <p className="font-medium">Name:</p>
                            <input type="text" id="name" className="border-2 p-2 border-red-200 rounded-xl w-full outline-none" onChange={(event) => setRsvpData({ ...rsvpData, name: event.target.value })} />
                        </label>
                        <label htmlFor="email" className="mt-2 block">
                            <p className="font-medium">Email:</p>
                            <input type="email" id="email" className="border-2 p-2 border-red-200 rounded-xl w-full outline-none" onChange={(event) => setRsvpData({ ...rsvpData, email: event.target.value })} />
                        </label>
                        {meeting.price !== 'Free' &&
                            <p className="text-lg">
                                * You have to make the payment at the venue.
                            </p>
                        }
                        <button className="w-full bg-[#f64060] rounded p-2 text-white font-semibold text-xl my-2" onClick={() => rsvpClickHandler()}>RSVP</button>
                    </div>
                </div>}
        </div>
    )
}
