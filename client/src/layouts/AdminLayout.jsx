import React from 'react'
import { Outlet } from 'react-router'
import { NavbarAdmin } from '../components/NavbarAdmin/NavbarAdmin'

export const AdminLayout = () => {
  return (
    <div>
      <header>
        <NavbarAdmin/>
      </header>
      <main>
        <Outlet/>
      </main>
      <footer>

      </footer>
    </div>
  )
}
