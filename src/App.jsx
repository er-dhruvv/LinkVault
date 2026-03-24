// import {app} from "./firebase"
import { Routes, Route } from "react-router-dom";
import {SignUp} from './pages/SignUp'
import {Login} from './pages/login'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" Component={Login} />
        <Route path="/" Component={SignUp} />
      </Routes>
    </>
  );
}

export default App;
