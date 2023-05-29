import React, { useEffect } from 'react'
import NavbarDashboard from '../header/NavbarDashboard'
import SideBar from '../sidebar/SideBar'
import SideNavbar from '../sidebar/SideNavbar'
import { Outlet } from 'react-router-dom'
import { Container } from '@mui/material'
import { directus } from '../../configs/public_url'

const Layout = () => {
  const token = localStorage.getItem('token')
  const email = localStorage.getItem('email')
  useEffect(() => {
    
    (async () => {
      const data = await directus.items('user').readByQuery({
        fields: ['email', 'token'],
        filter: {
          email: {
            _eq: email
          },
          token: {
            _eq: token
          }
        }
      })
      
      if (data.data.length === 0) {
        window.location.href = '/'
      }
    })()

  }, [])
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