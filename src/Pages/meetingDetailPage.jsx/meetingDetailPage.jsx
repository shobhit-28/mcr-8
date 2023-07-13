import { useContext } from "react"
import { useParams } from "react-router-dom"
import { DataContext } from "../../context/dataContext"

import { BiTimeFive } from 'react-icons/bi'
import { TfiLocationPin } from 'react-icons/tfi'
import { BsCurrencyRupee } from "react-icons/bs"

export const MeetingDetailPage = () => {
    const { meetingDetail } = useParams()

    const { data } = useContext(DataContext)

    const meeting = data.find(({ id }) => id === meetingDetail)

    console.log(meeting)

    return (
        <div className="pt-16">
            <div className="px-2">
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
            <div className="px-2">
                <div className="">
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
                        </div>}
                </div>
            </div>
        </div>
    )
}
