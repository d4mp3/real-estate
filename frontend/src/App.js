import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';

// Components
import Home from './Components/Home';
import Login from './Components/Login';
import Listings from './Components/Listings';
import Navbar from './Components/Navbar';


function App() {

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/listings" element={<Listings />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
