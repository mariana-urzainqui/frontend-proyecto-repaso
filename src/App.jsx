import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './Screens/Login/Login'
import Register from './Screens/Register/Register'
import ForgotPassword from './Screens/ForgotPassword/ForgotPassword'
import ResetPassword from './Screens/ResetPassword/ResetPassword'
import HomeScreen from './Screens/HomeScreen/HomeScreen'
import CreateProduct from './Screens/CreateProduct/CreateProduct'
import DetailProduct from './Screens/DetailProduct/DetailProduct'
import ProtectedRoute from './Components/ProtectedRoute'
import VerifyEmail from './Screens/VerifyMail/VerifyMail'

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/reset-password/:reset_token' element={<ResetPassword />} />
        <Route path="/verify/:verificationToken" element={<VerifyEmail/>} />
        <Route element={<ProtectedRoute />}>
          <Route path='/home' element={<HomeScreen />} />
          <Route path='/product/new' element={<CreateProduct />} />
          <Route path='/product/:product_id' element={<DetailProduct />} />
        </Route>
      </Routes>
    </>
  )
}

export default App

