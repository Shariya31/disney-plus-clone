import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './components/Login'
import Header from './components/Header'
import Home from './components/Home'
import Detail from './components/Detail'

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route exact path='/' element={<Login />} />
        <Route path ='/home' element = {<Home/>}/>
        <Route path = '/detail/:id' element = {<Detail/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App