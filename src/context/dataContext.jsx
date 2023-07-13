/* eslint-disable react/prop-types */
import { createContext, useState } from "react";
import { meetingData } from "../data/data";

export const DataContext = createContext();

export const DataHandler = ({children}) => {
    const [data, setData] = useState(meetingData.meetups);

    return (
        <DataContext.Provider value={{
            data,
            setData
        }}>
            {children}
        </DataContext.Provider>
    )
}