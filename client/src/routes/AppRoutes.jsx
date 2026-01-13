import React, { lazy, Suspense, useContext } from 'react'
import {BrowserRouter, Route, Routes} from 'react-router'
import { PublicRoutes } from './PublicRoutes'
import { PrivateRoutes } from './PrivateRoutes'

import { PublicLayout } from '../layouts/PublicLayout'
const HomePage = lazy(()=>import('../pages/publicPages/HomePage/HomePage'))
const AboutPage = lazy(()=>import('../pages/publicPages/AboutPage/AbouPage'))
const RegisterPage = lazy(()=>import('../pages/publicPages/AuthPages/RegisterPage/RegisterPage'))
const LoginPage = lazy(()=>import('../pages/publicPages/AuthPages/LoginPage/LoginPage'))
const ErrorPage = lazy(()=>import('../pages/publicPages/ErrorPage/ErrorPage'))

import { UserLayout } from '../layouts/UserLayout'
const AllUserPage = lazy(()=>import('../pages/userPages/AllUsersPage/AllUsersPage'))
const ProfilePage = lazy(()=>import('../pages/userPages/ProfilePage/ProfilePage'))
const EditUserPage = lazy(()=>import('../pages/userPages/EditUserPage/EditUserPage'))

import { AdminLayout } from '../layouts/AdminLayout'
import { AuthContext } from '../contexts/AuthContext/AuthContext'

const AdminDashboard = lazy(()=>import('../pages/AdminPages/AdminDashboard/AdminDashboard'))

export const AppRoutes = () => {
  const {user} = useContext(AuthContext);
  return (
    <BrowserRouter>
    <Suspense fallback={<div>Cargando...</div>}>
      <Routes>
        {/* rutas públicas */}
        <Route element={<PublicRoutes/>}>
          <Route path='/' element={<PublicLayout/>}>
              <Route path='/' element={<HomePage/>}/>
              <Route path='/about' element={<AboutPage/>}/>
              <Route path='/register' element={<RegisterPage/>}/>
              <Route path='/login' element={<LoginPage/>}/>
          </Route>
        </Route>

          {/* Rutas privadas de user*/}
          <Route element={<PrivateRoutes 
                              user={user} 
                              requiredType={1}/>}>
            <Route element={<UserLayout/>}>
              <Route path='allUsers' element={<AllUserPage/>}/>
              <Route path='profile' element={<ProfilePage/>}/>
              <Route path='editUser' element={<EditUserPage/>}/>
            </Route>
          </Route>

          {/* Rutas privadas de administrador */}
          <Route element={<PrivateRoutes 
                              user={user} 
                              requiredType={2}/>}>
            <Route element={<AdminLayout/>}>
              <Route path='/admin' element={<AdminDashboard/>}/>
            </Route>
          </Route>

          {/* Error */}
          <Route path='*' element={<ErrorPage/>}/>
      </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
