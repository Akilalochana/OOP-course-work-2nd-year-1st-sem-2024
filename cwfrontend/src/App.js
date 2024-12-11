import './App.css';
import Home from './Pages/Home'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LogingPage from './Pages/LogingPage';
import RegisterPage from './Pages/RegisterPage';
import VendorLoginPage from './Pages/VendorLoginPage';
import VendorRegisterPage from './Pages/VendorRegisterPage';
import SimulationPage from './components/SimulationPage';


function App() {
  return (
    <Router>
      <div>
        <Routes>

          <Route path="/" element={<Home/>}/>
          
          <Route path="/loging" element={<LogingPage/>}/>
          <Route path="/register" element={<RegisterPage/>} />

          <Route path="/venderlogin" element={<VendorLoginPage/>}/>
          <Route path="/venderregister" element={<VendorRegisterPage/>}/>

        
          <Route path="/simulationPage" element={<SimulationPage/>}/>

          



        </Routes>


      </div>

    </Router>

    
  );
}


export default App;
