import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';

// Components
import Home from './Components/Home';
import Login from './Components/Login';
import Listings from './Components/Listings';
import Navbar from './Components/Navbar';
import Testing from './Components/Testing';


function App() {

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/listings" element={<Listings />} />
        <Route path="/testing" element={<Testing />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
