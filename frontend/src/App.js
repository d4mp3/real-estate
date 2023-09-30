import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import './App.css';

// Components
import Home from './Components/Home';
import Login from './Components/Login';
import Listings from './Components/Listings';
import Header from './Components/Header';


function App() {

  return (
    <BrowserRouter>
      <CssBaseline />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/listings" element={<Listings />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
