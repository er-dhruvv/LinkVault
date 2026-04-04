import { Routes, Route, Navigate } from "react-router-dom";
import SignupPage from './pages/signup'
import LoginPage from './pages/login'
import HomePage from './pages/Home'
import Navbar from './components/Navbar'

function App() {
  return (
    <>
      <Navbar />
      <Routes>  
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/home" element={<HomePage />} />
      </Routes>
    </>
  );
}



export default App;
