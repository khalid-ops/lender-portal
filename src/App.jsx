import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/home'
import NotFound from './pages/notfound'
import Navbar from './components/navbar'
import Applications from './pages/applications'
import LenderProgramForm from './components/lender-program'

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/applications" element={<Applications />} />
          <Route path='/lender-program-create' element={<LenderProgramForm />} />
          {/* 404 - catch all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  )
}
