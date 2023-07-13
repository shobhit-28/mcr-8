import { Route, Routes } from "react-router-dom"
import { HomePage } from "./Pages/HomePage/HomePage"
import { NavBar } from "./components/navBar/NavBar"
import { MeetingDetailPage } from "./Pages/meetingDetailPage.jsx/meetingDetailPage"

function App() {

  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/meeting/:meetingDetail" element={<MeetingDetailPage />} />
      </Routes>
    </div>
  )
}

export default App