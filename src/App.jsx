import { Route, Routes } from "react-router-dom"
import { HomePage } from "./Pages/HomePage/HomePage"
import { NavBar } from "./components/navBar/NavBar"

function App() {

  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </div>
  )
}

export default App