import React, { useEffect, useState } from 'react'
import { Form, Button, Spinner } from 'react-bootstrap'
import logo from '../../assets/images/devcamp-1.png'
import { useDispatch } from 'react-redux'
import { getUserById, verifyEmail } from '../../reducers/user_reducer'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const VerifyEmail = () => {
  const card = {
    border: "2px solid #ECECEC",
    borderRadius: "12px",
    padding: "3rem 3rem",
    margin: "5rem auto",
    minWidth :"300px",
    maxWidth:"30%",
    textAlign: 'center',
    backgroundColor: '#4361EE',
    color: 'white'
  }
  const input = {
    border: "2px solid white"
  }

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user, isLoading } = useSelector((state) => state.user)
  const [email, setEmail] = useState('')
  const [token, setToken] = useState('')
  const idUser = localStorage.getItem('idUser')

  useEffect(() => {
    dispatch(getUserById(idUser))
  }, [])

  const onChange = (e, set) => {
    let value
    if (e) {
      value = e.target ? e.target.value : e.value
    } else {
      value = ''
    }

    set(value)
  }

  const onSubmit = async (e) => {
    e.preventDefault()

    const data = {
      email,
      token
    }
    
    if (data.token != user.verif_token || data.email != user.email) {
      alert('Token tidak valid')
    }
    else if (data.token == user.verif_token && data.email == user.email && user.isActive == false) {
      alert('Email berhasil diverifikasi')
      
      await dispatch(verifyEmail(data))
      localStorage.removeItem('token')
      navigate('/login')
    }
  }

  return (
    <>
      <div className="container w-full" style={card}>
        <img src={logo} alt="logo" />
        <p style={{fontSize: '1.2rem', margin: '1rem 0 2rem'}}>Silahkan masukkan token yang dikirim melalui email Anda untuk <b>aktivasi akun</b></p>
        <Form onSubmit={onSubmit}>
          <Form.Group className="mb-3 text-start" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control 
              type="email"
              name="email" 
              value={email} 
              onChange={(e) => onChange(e, setEmail)} 
              style={input} 
            />
          </Form.Group>

          <Form.Group className="mb-3 text-start position-relative">
            <Form.Label>Token</Form.Label>
            <Form.Control 
              id="token"
              type="text" 
              name="token"
              value={token} 
              onChange={(e) => onChange(e, setToken)} 
              style={input} 
            />
          </Form.Group>

          <Button type='submit' className='py-3 w-100' style={{background: '#1E266D', fontWeight: '500', margin: '3rem 0'}}>
            {isLoading === true ? <Spinner animation="border" variant="light" /> : 'MASUK'}
          </Button>
          
        </Form>
      </div>
    </>
  )
}

export default VerifyEmail