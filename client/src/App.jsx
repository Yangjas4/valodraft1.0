import './App.css';
import Landing from './pages/Landing';
import Bo2 from './pages/Bo2';
import Bo3 from './pages/Bo3';
import io from "socket.io-client";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
const socket = io.connect("http://localhost:3000");

export default function App() {

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Landing />}/>
        <Route path='bo2/:id' element={<Bo2 />}/>
        <Route path='bo3/:id' element={<Bo3 />}/>
      </Routes>
      </BrowserRouter>
    </>
  )
}


