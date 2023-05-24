import React from 'react'
import NavbarDashboard from '../header/NavbarDashboard'
import SideBar from '../sidebar/SideBar'
import SideNavbar from '../sidebar/SideNavbar'
import { Outlet } from 'react-router-dom'
import { Container } from '@mui/material'

const Layout = () => {
  return (
    <>
      <NavbarDashboard />
      <div className='d-flex' style={{height: '100vh'}}>
        <SideNavbar />
        <Container sx={{p: 3, bgcolor: '#eef2f6', minWidth: '85%', borderRadius: 5, marginX: 3, mt: 2}}>
          <Outlet />
        </Container>
      </div>
    </>
  )
}

export default Layout