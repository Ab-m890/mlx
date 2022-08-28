import React from 'react'

import { Routes, Route } from 'react-router-dom'

//firebase 
import firebase from './firebase'

//react query
import { QueryClientProvider, QueryClient } from 'react-query'

//material ui
import {Box} from '@mui/material'

// pages
import Home from './page/Home'

import AdDetails from './page/AdDetails'

import Register from './page/Register'

import Login from './page/Login'

import PostAd from './page/PostAd'

import MyAds from './page/MyAds'

import AdsByCategories from './page/AdsByCategories'

import Search from './page/Search'

import Account from './page/Account'

import UserProfile from './page/User'

import Edit from './page/Edit'

import EditAccount from './page/EditAccount'

//components
import Navbar from './components/navbar/Navbar'

import BottomNavbar from './components/navbar/BottomNavbar'

//protected route
import { IsLogin , IsNotLogin} from './components/protected-route/ProtectedRoute'

function App() {

  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      <Navbar />
      <Box component="main" pt={{ xs: "56px" , sm: "64px" }} pb={{ xs: 7 }}>
        <Routes>

          <Route index element={<Home />} />

          <Route element={<IsLogin />}>

              <Route path='/myads' element={<MyAds />} />

              <Route path='/post-ad' element={<PostAd />} />

              <Route path='/edit/:id' element={<Edit />} />

          </Route>

          <Route element={<IsNotLogin />}>

              <Route path='/register' element={<Register />} />

              <Route path='/login' element={<Login />} />

          </Route>

          <Route path='/ad/:id' element={<AdDetails />} />

          <Route path='/category'>

              <Route path=':category' element={<AdsByCategories />} />

          </Route>

          <Route path='/search' element={<Search />} />

          <Route path='/account'>

            <Route index element={<Account />} />

            <Route path="/account/edit" element={<EditAccount />} />

          </Route>

          <Route path='/user/:id' element={<UserProfile />} />

        </Routes>
      </Box>
      <BottomNavbar />
    </QueryClientProvider>
  )
}

export default App
