import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Col, Container, Row, Form, Button, Modal } from 'react-bootstrap'
import { fetchKelas } from '../../reducers/kelas_reducer'
import { getUserByEmail, register } from '../../reducers/user_reducer'
import { useNavigate } from 'react-router-dom'
import NavbarLanding from '../../components/header/NavbarLanding'
import { AiFillEyeInvisible } from 'react-icons/ai'

const RegisterPage = () => {
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

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { kelas } = useSelector((state) => state.kelas)
  const [nama_lengkap, setNama] = useState('')
  const [kelasUser, setKelasUser] = useState('')
  const [email, setEmail] = useState('')
  const [kata_sandi, setKata_sandi] = useState('')
  const [confirm_kata_sandi, setConfirm] = useState('')
  const token = localStorage.getItem('token')

  useEffect(() => {
    dispatch(fetchKelas())
    if (token) {
      navigate('/peserta/dashboard')
    }
  }, [])
  
  const handleKelas = (e) => {
    setKelasUser(e.target.value)
  }

  const handleChange = (e, set) => {
    let value
    if (e) {
      value = e.target ? e.target.value : e.value
    } else {
      value = ''
    }

    set(value)
  }

  const onRegister = async (e) => {
    e.preventDefault()

    if (nama_lengkap === '' || email === '' || kata_sandi === '' || confirm_kata_sandi === '' || kelasUser === '') {
      // alert('Please fill all the form')
      return
    }
    else if (kata_sandi !== confirm_kata_sandi) {
      alert('Password and confirm password must be same')
      return
    }
    else {
      const user = await dispatch(getUserByEmail(email))

      if (user.payload.data.length > 0) {
        alert('Email already exist')
        return
      }
      else {
        const data = await dispatch(register({
          nama_lengkap,
          kelas: kelasUser,
          email,
          kata_sandi,
          confirm_kata_sandi
        }))
  
        if (!data.error) {
          alert('Register success, silahkan cek email untuk aktivasi akun')
          // localStorage.setItem('token', data.payload.token)
          localStorage.setItem('email', data.payload.email)
          // localStorage.setItem('email', email)
          navigate(`/login`)
        }
        else {
          alert('Register failed')
        }
      }
    }
  }

  const handleShowPassword = () => {
    const password = document.getElementById('password')
    const verifyPassword = document.getElementById('verifyPassword')

    if (password.type === 'password') {
        password.type = 'text'
    } else {
        password.type = 'password'
    }

    if (verifyPassword.type === 'password') {
        verifyPassword.type = 'text'
    } else {
        verifyPassword.type = 'password'
    }
  } 

  return (
    <>
      {/* <NavbarLanding /> */}
      <Row>
        <Col>
          <Container className='bg-login'>
            <Container style={card}>
              <h1 className='text-center mt-5'>DevCamp</h1>
              <p className='position-absolute bottom-0 mb-4 ms-5'>All rights reserved. Copyright &copy; 2023 DevCamp.</p>
            </Container>
          </Container>
        </Col>
        <Col>
          <Container style={{width: '50%', marginTop: '20%'}}>
            <h1>Selamat Datang</h1>
            <p style={{color: '#64748B'}}>Untuk peserta silahkan isi form untuk mendaftar</p>
            <Form onSubmit={onRegister}>
              <Form.Group className="mb-3">
                <Form.Label>Nama Lengkap</Form.Label>
                <Form.Control 
                  type="text"
                  name="nama_lengkap"
                  value={nama_lengkap}
                  onChange={(e) => handleChange(e, setNama)}
                  placeholder="Masukkan nama lengkap" 
                  required
                />
              </Form.Group>

              <fieldset>
                <Form.Group className='mb-3'>
                  <Form.Label>Kelas</Form.Label>
                    {kelas.map((kelas, index) => 
                      <Form.Check
                        key={index}
                        onClick={handleKelas}
                        type="radio"
                        label={kelas.nama_kelas}
                        value={kelas.id}
                        name="kelas"
                        id={`formHorizontalRadios${index+1}`}
                        required
                      />
                    )}
                </Form.Group>
              </fieldset>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control 
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => handleChange(e, setEmail)}
                  placeholder="Masukkan email" 
                  required
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
                  minLength='6'
                  pattern='(?=.*\d)(?=.*[a-z]).{6,}'
                  required
                />
                <span style={{right: '20px', top: '40%', color: 'grey'}} className='position-absolute' onClick={handleShowPassword}>
                  <AiFillEyeInvisible/>
                </span>
                <small className='text-muted'>Gunakan minimal 6 karakter dengan kombinasi huruf dan angka</small>
              </Form.Group>
              
              <Form.Group className="mb-3 position-relative" controlId="formBasicPassword">
                <Form.Label>Konfirmasi Password</Form.Label>
                <Form.Control 
                  id='verifyPassword'
                  type="password"
                  name="confirm_kata_sandi"
                  value={confirm_kata_sandi}
                  onChange={(e) => handleChange(e, setConfirm)}
                  placeholder="Masukkan password" 
                  minLength='6'
                  pattern='(?=.*\d)(?=.*[a-z]).{6,}'
                  required
                />
                <span style={{right: '20px', top: '40%', color: 'grey'}} className='position-absolute' onClick={handleShowPassword}>
                  <AiFillEyeInvisible/>
                </span>
                <small className='text-muted'>Gunakan minimal 6 karakter dengan kombinasi huruf dan angka</small>
              </Form.Group>

    
              <Button 
                variant="primary" 
                type="submit"
                // onClick={() => setShow(true)}
                style={{width: '100%'}}
                className='mt-3'
              >
                Daftar
              </Button>
            </Form>
            <div className='text-end'>
              <p>
                Sudah punya akun?
                <a href='/login' variant='light' style={{fontWeight: 'bold', background: 'none', border: 'none'}}>Masuk</a>
              </p>
            </div>
          </Container>
        </Col>
      </Row>
    </>
  )
}

export default RegisterPage