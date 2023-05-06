import './App.css';
import Landing from './pages/Landing';
import io from "socket.io-client";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
const socket = io.connect("http://localhost:3000");

export default function App() {

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Landing />}/>

      </Routes>
      </BrowserRouter>
    </>
  )
}


