import React, { useEffect, useState } from 'react'
import './style.css'
import { Col, Container, Row, Form, Button, Modal } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { url } from '../../configs/public_url'
import { login } from '../../reducers/user_reducer'
import { Button as ButtonMUI } from '@mui/material'
import NavbarLanding from '../../components/header/NavbarLanding'
import { AiFillEyeInvisible } from 'react-icons/ai'

const LoginPage = () => {
  const card = {
    border: '2px solid white',
    background: 'rgba(255, 255, 255, 0.65)',
    borderRadius: '6px',
    position: 'absolute',
    left: '4.29%',
    right: '4.29%',
    width: '90%',
    top: '70.52%',
    bottom: '3.23%',
  }

  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [email, setEmail] = useState('')
  const [kata_sandi, setKata_sandi] = useState('')
  const token = localStorage.getItem('token')

  useEffect(() => {
    if (token) {
      navigate('/peserta/dashboard')
    }
  }, [])

  const handleChange = (e, set) => {
    let value
    if (e) {
      value = e.target ? e.target.value : e.value
    } else {
      value = ''
    }

    set(value)
  }

  const handleResetPassword = async (e) => {
    const token = Math.random().toString(36).substring(2)
    let body = {
      email: email.toLocaleLowerCase(),
      reset_password_token: token,
    }

    if (email === '') {
      alert('Please fill all the form')
      return
    }
    else {
      try {
        e.preventDefault()
        const response = await fetch(`${url}/items/lupa_password`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        })
  
        if (response.status === 200) {
          alert('Silahkan cek email anda untuk reset password')
        } else {
          const error = await response.json()
  
          console.error(error)
        }
      } catch (error) {
        alert('error', error.message)
      }
    }
  }

  const onLogin = async (e) => {
    e.preventDefault()
    const data = await dispatch(login({ email, kata_sandi }))

    if (email === '' || kata_sandi === '') {
      alert('Email atau password salah')
    }
    else if (data.error) {
      alert('Email atau password salah')
    } 
    else if (data.payload.verify === false) {
      alert('Email atau password salah')
    }
    else if (data.payload.verify === true) {
      localStorage.setItem('token', data.payload.token)
      localStorage.setItem('idUser', data.payload.id)
      // localStorage.setItem('email', email)
      navigate('/peserta/dashboard')
    } 
  }

  const handleShowPassword = () => {
    const password = document.getElementById('password')

    if (password.type === 'password') {
        password.type = 'text'
    } else {
        password.type = 'password'
    }
  } 

  return (
    <>
      {/* <NavbarLanding /> */}
      <Row>
        <Col>
          <Container style={{width: '50%', marginTop: '20%'}}>
            <h1>Selamat Datang</h1>
            <p style={{color: '#64748B'}}>Untuk peserta silahkan login menggunakan email yang terdaftar</p>
            <Form onSubmit={onLogin}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control 
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => handleChange(e, setEmail)}
                  placeholder="Masukkan email" 
                />
              </Form.Group>

              <Form.Group className="mb-3 position-relative" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control 
                  id='password'
                  type="password"
                  name="password"
                  value={kata_sandi}
                  onChange={(e) => handleChange(e, setKata_sandi)}
                  placeholder="Masukkan password" 
                />
                <span style={{right: '20px', top: '55%', color: 'grey'}} className='position-absolute' onClick={handleShowPassword}>
                  <AiFillEyeInvisible/>
                </span>
              </Form.Group>
              
              <div className='text-end'>
                <Button variant='light' onClick={handleShow} style={{fontWeight: 'bold', background: 'none', border: 'none'}}>Lupa Password</Button>
              </div>
    
              <Button 
                variant="primary" 
                type="submit"
                // onClick={() => setShow(true)}
                style={{width: '100%'}}
                className='mt-3'
              >
                Masuk
              </Button>
            </Form>
            
            <div className='text-center mt-3'>
              <p>
                Belum punya akun?
                <a href='/register' variant='light' style={{fontWeight: 'bold', background: 'none', border: 'none'}}>Daftar</a>
              </p>
            </div>

            <div className='mt-5'>
              <hr/>
              <p style={{color: '#64748B', marginTop: '20px'}} className='text-center'>Login untuk admin dan pengajar</p>
              <Row>
                <Col>
                  <ButtonMUI href={url} variant="contained" color="success" sx={{width: '100%', fontFamily: 'Inter'}}>Pengajar</ButtonMUI>
                </Col>
                <Col>
                  <ButtonMUI href={url} variant='contained' sx={{width: '100%', backgroundColor: '#8866ff', bordercolor: '#8866ff', "&:hover": {backgroundColor: "#5b44aa"}, fontFamily: 'Inter'}}>Admin</ButtonMUI>
                </Col>
              </Row>
            </div>

            <Modal show={show} onHide={handleClose} centered>
              <Modal.Header closeButton>
                <Modal.Title>Reset Password</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                  <Form onSubmit={handleResetPassword}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Email</Form.Label>
                      <Form.Control 
                        type="email"
                        name="email"
                        value={email}
                        onChange={(e) => handleChange(e, setEmail)}
                        placeholder="Masukkan email" 
                      />
                    </Form.Group>
                    
                    <Button 
                      variant="primary" 
                      type="submit"
                      // onClick={() => setShow(true)}
                      style={{width: '100%'}}
                      className='mt-3'
                    >
                      Kirim
                    </Button>
                  </Form>
              </Modal.Body>
            </Modal>

          </Container>
        </Col>

        <Col>
          <Container className='bg-login'>
            <Container style={card}>
              <h1 className='text-center mt-5'>DevCamp</h1>
              <p className='position-absolute bottom-0 mb-4 ms-5'>All rights reserved. Copyright &copy; 2023 DevCamp.</p>
            </Container>
          </Container>
        </Col>
      </Row>
    </>
  )
}

export default LoginPage