import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import Home from './pages/Home'
import SignIn from './components/auth/SignIn'
import SignUp from './components/auth/SignUp'
import Appointments from './pages/Appointments'
import Services from './pages/Services'
import Doctors from './pages/Doctors'
import Contact from './pages/Contact'
import VideoConference from './pages/VideoConference'
import UploadBrouchers from './pages/UploadBroucher'
import Survey from './pages/Survey'
import Materials from './pages/Materials'
import ProductForm from './pages/Product-form'

function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/services" element={<Services />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/video-conference" element={<VideoConference />} />
          <Route path="/upload-brouchers" element={<UploadBrouchers />} />
          <Route path="/materials" element={<Materials />} />
          <Route path='/survey' element={<Survey />} />
          <Route path='/create-product' element={<ProductForm />} />
        </Routes>
      </MainLayout>
    </Router>
  )
}

export default App
