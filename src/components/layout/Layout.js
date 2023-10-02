import React from 'react'
import NavbarDashboard from '../header/NavbarDashboard'
import SideNavbar from '../sidebar/SideNavbar'
import { Outlet } from 'react-router-dom'
import { Container } from '@mui/material'

const Layout = () => {
  return (
    <>
      <NavbarDashboard />
      <div className='d-flex' style={{height: ''}}>
        <SideNavbar />
        <Container sx={{p: 3, bgcolor: '#eef2f6', minWidth: '85%', borderRadius: 5, marginLeft: 3, marginY: 2}}>
          <Outlet />
        </Container>
      </div>
    </>
  )
}

export default Layout