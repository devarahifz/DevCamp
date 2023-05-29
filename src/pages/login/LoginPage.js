import React, { useEffect, useState } from 'react'
import './style.css'
import { Col, Container, Row, Form, Button, Modal } from 'react-bootstrap'
import { asyncSetAuthentication } from '../../reducers/auth_action'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { directus, url } from '../../configs/public_url'
import { login } from '../../reducers/user_reducer'

const LoginPage = () => {
  const card = {
    border: '2px solid white',
    background: 'rgba(255, 255, 255, 0.65)',
    borderRadius: '6px',
    position: 'absolute',
    left: '4.29%',
    right: '4.29%',
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
  const [confirm_kata_sandi, setConfirm] = useState('')
  const [dataUser, setDataUser] = useState('')
  const [isValid, setIsValid] = useState(true)

  const handleChange = (e, set, error, message) => {
    let value
    if (e) {
      value = e.target ? e.target.value : e.value
    } else {
      value = ''
    }

    if (!value) {
      error(`Please enter your ${message}`)
    } else {
      error('')
    }

    set(value)
  }

  let [errorEmail, setErrorEmail] = useState('')
  let [errorKata_sandi, setErrorKata_sandi] = useState('')
  let [errorConfirm, setErrorConfirm] = useState('')

  const handleError = (data) => {
    const checkEmail = dataUser.data.filter(
      (item) => item.email === data.email
    )
    const checkKata_sandi = dataUser.data.filter(
      (item) => item.kata_sandi === data.kata_sandi
    )
    const checkConfirm = dataUser.data.filter(
      (item) => item.confirm_kata_sandi === data.confirm_kata_sandi
    )

    if (data.email === '') {
      setErrorEmail('Please enter your email')
      setIsValid(false)
    } else if (checkEmail.length === 0) {
      setErrorEmail('Email not found')
      setIsValid(false)
    } else {
      setErrorEmail('')
      setIsValid(true)
    }

    if (data.kata_sandi === '') {
      setErrorKata_sandi('Please enter your password')
      setIsValid(false)
    } else if (checkKata_sandi.length === 0) {
      setErrorKata_sandi('Password is incorrect')
      setIsValid(false)
    } else {
      setErrorKata_sandi('')
      setIsValid(true)
    }

    if (data.confirm_kata_sandi === '') {
      setErrorConfirm('Please enter your confirm password')
      setIsValid(false)
    } else if (checkConfirm.length === 0) {
      setErrorConfirm('Confirm password is incorrect')
      setIsValid(false)
    } else {
      setErrorConfirm('')
      setIsValid(true)
    }
  }

  const [items, setItems] = useState('')
  const handleLogin = async (e) => {
    e.preventDefault()
    let payload = {
      email: email,
      kata_sandi: kata_sandi,
      confirm_kata_sandi: confirm_kata_sandi,
    }

    handleError(payload)
    for (var keys in payload) {
      if (payload[keys] === '') {
        return
      }
    }

    if (!isValid) {
      return
    }

    dispatch(asyncSetAuthentication({ email, kata_sandi, confirm_kata_sandi}))
    const timeout = setTimeout(() => {
      navigate('/peserta/dashboard')
    }, 2000)

    return () => clearTimeout(timeout)
  }

  const handleErrorEmail = (data) => {
    if (data.email === '') {
      setErrorEmail('Please enter your email')
    }
  }

  const handleResetPassword = async (e) => {
    const token = Math.random().toString(36).substring(2)
    let body = {
      email: email.toLocaleLowerCase(),
      reset_password_token: token,
    }

    handleErrorEmail(body)

    for (var keys in body) { 
      if (body[keys] === '') {
        e.preventDefault()
        return
      }
    }

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

  const onLogin = async (e) => {
    e.preventDefault()
    const data = await dispatch(login({ email, kata_sandi }))

    if (data.payload.verify === true) {
      localStorage.setItem('token', data.payload.token)
      localStorage.setItem('idUser', data.payload.id)
      localStorage.setItem('email', email)
      navigate('/peserta/dashboard')
      console.log(data)
    } else {
      alert('Email atau password salah')
    }
  }

  return (
    <>
      <Row>
        <Col>
          <Container style={{width: '50%', marginTop: '25%'}}>
            <h1>Selamat Datang</h1>
            <p style={{color: '#64748B'}}>Silahkan login menggunakan email yang terdaftar</p>
            <Form onSubmit={onLogin}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control 
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => handleChange(e, setEmail, setErrorEmail, 'email')}
                  errorMessage={errorEmail}
                  placeholder="Masukkan email" 
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control 
                  type="password"
                  name="password"
                  value={kata_sandi}
                  onChange={(e) => handleChange(e, setKata_sandi, setErrorKata_sandi, 'kata sandi')}
                  errorMessage={errorKata_sandi}
                  placeholder="Masukkan password" 
                />
              </Form.Group>
              
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Konfirmasi Password</Form.Label>
                <Form.Control 
                  type="password"
                  name="confirma_password"
                  value={confirm_kata_sandi}
                  onChange={(e) => handleChange(e, setConfirm, setErrorConfirm, 'confirm kata sandi')}
                  errorMessage={errorConfirm}
                  placeholder="Masukkan password" 
                />
              </Form.Group>

              <div className='text-end'>
                <Button onClick={handleShow} style={{fontWeight: 'bold'}}>Lupa Password</Button>
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
                        onChange={(e) => handleChange(e, setEmail, setErrorEmail, 'email')}
                        errorMessage={errorEmail}
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