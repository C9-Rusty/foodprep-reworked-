import React from 'react'
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/Sidebar/Sidebar'
import {Routes,Route} from 'react-router-dom'
import Add from './screens/Add/Add'
import List from './screens/List/List'
import Orders from './screens/Orders/Orders'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Login from "./components/Login/Login";



const App = () => {
  //const url = 'https://foodprepdemo.onrender.com'
  const url = "http://localhost:4000"
  return (
    <div>
      <ToastContainer />
      <Navbar />
      <hr />
      <div className="app-content">
        <Sidebar />
        <Routes>
          <Route path="/" element={<Login url={url}/>} />
          <Route path="/add" element={<Add url={url}/>} />
          <Route path="/list"  element={<List url={url}/>} />
          <Route path="/orders" element={<Orders url={url}/>} />
        </Routes>
      </div>
    </div>
  );
}

export default App