import './App.css';
import Home from './Pages/Home'
import HomeCustomer from './Pages/HomeCustomer';
import HomeVendor from './Pages/HomeVendor';
import AboutUs from './Pages/AboutUs';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


function App() {
  return (
    <Router>
      <div>
        <Routes>

          <Route path="/" element={<Home/>}/>
          <Route path="/customer" element={<HomeCustomer />} />
          <Route path="/vendor" element={<HomeVendor />} />
          <Route path="/about" element={<AboutUs />} />

        </Routes>


      </div>

    </Router>


    

      
    
  );
}


export default App;
