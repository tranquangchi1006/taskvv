import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Toaster, toast } from "sonner"
import HomePage from "./pages/HomePage"
import NotFound from "./pages/NotFound"

function App() {

  return (
    <>
      {/* <Toaster />
      <button onClick={() => toast('hello')}>Toaster</button> */}

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
