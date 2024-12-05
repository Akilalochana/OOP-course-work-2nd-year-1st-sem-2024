import './App.css';
import Home from './Pages/Home'
import AboutUs from './Pages/AboutUs';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LogingPage from './Pages/LogingPage';
import AddTicket from './Pages/AddTicket';
import RegisterPage from './Pages/RegisterPage';


function App() {
  return (
    <Router>
      <div>
        <Routes>

          <Route path="/" element={<Home/>}/>
          <Route path="/loging" element={<LogingPage/>}/>
          <Route path="/addtickets" element={<AddTicket/>}/>
          <Route path="/about" element={<AboutUs />} />
          <Route path="/register" element={<RegisterPage/>} />

        </Routes>


      </div>

    </Router>

    
  );
}


export default App;
