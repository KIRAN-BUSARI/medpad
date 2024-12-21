import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useRecoilValue } from 'recoil';
import { isAuthenticatedSelector } from './store/atoms/userState';
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
import Materials from './pages/Materials'

function PrivateRoute({ children }) {
  const isAuthenticated = useRecoilValue(isAuthenticatedSelector);
  return isAuthenticated ? children : <Navigate to="/signin" />;
}

function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/appointments" element={
            <PrivateRoute>
              <Appointments />
            </PrivateRoute>
          } />
          {/* Protected Routes */}
          <Route path="/video-conference" element={
            <PrivateRoute>
              <VideoConference />
            </PrivateRoute>
          } />
          <Route path="/upload-brouchers" element={
            <PrivateRoute>
              <UploadBrouchers />
            </PrivateRoute>
          } />
          <Route path="/materials" element={
            <PrivateRoute>
              <Materials />
            </PrivateRoute>
          } />
          {/* Public Routes */}
          <Route path="/services" element={<Services />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </MainLayout>
    </Router>
  )
}

export default App
