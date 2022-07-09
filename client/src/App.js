import React from 'react'

import {BrowserRouter , Routes , Route } from 'react-router-dom'

// pages
import Home from './page/Home'

import AdDetails from './page/AdDetails'

import Register from './page/Register'

import Login from './page/Login'

import PostAd from './page/PostAd'

function App() {

  return (
    <BrowserRouter>

      <Routes>

        <Route path='/' element={<Home />} />

        <Route path='/ad/:id' element={<AdDetails />} />

        <Route path='/register' element={<Register />} />

        <Route path='/login' element={<Login />} />

        <Route path='/post-ad' element={<PostAd />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App
