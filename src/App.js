import { BrowserRouter as Router,Route, Routes } from "react-router-dom"
import ShowEmployee from "./Components/ShowEmployee"
import AddEmployee from "./Components/AddEmployee"
import { ModalBody } from "react-bootstrap"

const App=()=>{
  

  return <>
  <Router>
    <Routes>
    <Route path="/AddEmployee" element={<AddEmployee/>}></Route>

<Route path="/" element={<ShowEmployee/>}></Route>
    </Routes>
  </Router>
 

  </>

}

export default App