import React from 'react'
import { Outlet } from 'react-router'
import { NavbarPublic } from '../components/NavbarPublic/NavbarPublic'

export const PublicLayout = () => {
  return (
    <div>
      <header className='header-public'>
          <NavbarPublic/>
      </header>
      <main className='main-public'>
          <Outlet/>
      </main>
      <footer className='footer-public'>
          <p>footer publico</p>
      </footer>
    </div>
  )
}
