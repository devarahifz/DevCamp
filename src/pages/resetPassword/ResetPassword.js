import React, { useEffect, useState } from 'react'
import { Container, Form, Button } from 'react-bootstrap'
import { url } from '../../configs/public_url'
import { useNavigate } from 'react-router-dom'

const ResetPassword = () => {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirm] = useState('')
  const [errorPassword, setErrorPassword] = useState('')
  const [errorConfirm, setErrorConfirm] = useState('')
  const [id, setId] = useState('')
  const [data, setData] = useState('')
  const [takenEmail, setTakeEmail] = useState('')
  const [userId, setUserId] = useState('')
  const navigate = useNavigate()

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

  const handleError = (data) => {
    data.password
      ? setErrorPassword('')
      : setErrorPassword('Please enter your password')
    if (data.confirm_password !== data.password) {
      alert(setErrorConfirm('Password not match'))
    } else if (data.confirm_password === '') {
      alert(setErrorConfirm('Please enter your confirm password'))
    }
  }

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const token = urlParams.get('reset_password_token')

    const fethForgotPassword = async () => {
      try {
        const response = await fetch(
          `${url}/items/lupa_password?filter[reset_password_token]=${token}&filter[isUsed]=0`
        )
        
        const data = await response.json()
        setData(data)

        if (data.data.length > 0) {
          const takeEmailForgotPassword = data.data[0].email
          const takeId = data.data[0].id
          setTakeEmail(takeEmailForgotPassword)
          setId(takeId)

          const fetchUser = async () => {
            try {
              const response = await fetch(
                `${url}/items/user?filter[email]=${takeEmailForgotPassword}`
              )
              const data = await response.json()

              if (data.data.length > 0) {
                const userId = data.data[0].id
                setUserId(userId)
              }
            } catch (error) {
              console.log(
                "Error saat mencari email dalam collection user:",
                error
              )
            }
          }
          fetchUser()
        } else {
          navigate('/login')
        }
      } catch (error) {
        console.log(
          "Error saat mencari token dalam collection lupa_password:",
          error
        )
      }
    }
    fethForgotPassword()
  }, [])

  const resetPasswordChange = async (e) => {
    e.preventDefault()
    let payload = {
      kata_sandi: password,
    }

    const body = {
      isUsed: 1,
    }

    handleError(payload)
    for (var keys in payload) {
      if (payload[keys] === '') {
        return
      }
    }

    try {
      if (password !== confirmPassword) {
        alert('Password not match')
        return
      }
      else if (password == '') {
        alert('Please enter your password')
        return
      }
      else if (confirmPassword == '') {
        alert('Please enter your confirm password')
        return
      }
      else {
        const updateResponse = await fetch(
          `${url}/items/user/${userId}`,
          {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
          }
        )
        window.location.href = '/login'
      }
    } catch (error){
      console.log("Error saat update password:", error)
    }

    const changeIsUsedToTrue = async () => {
      await fetch(`${url}/items/lupa_password/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      })
    }
    changeIsUsedToTrue()
  }

  if (data) {
    return (
      <>
        <Container className='mt-5' style={{width: '50%'}}>
          <h1 className='text-center mb-5'>Reset Password</h1>
          <p>Lupa password? <b>Reset password disini!</b></p>
            <Form onSubmit={resetPasswordChange}>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password Baru</Form.Label>
                <Form.Control 
                  type="password"
                  name="password"
                  value={password || ''}
                  onChange={(e) => handleChange(e, setPassword, setErrorPassword, 'password')}
                  // errorMessage={errorPassword}
                  placeholder="Masukkan password" 
                />
              </Form.Group>
              
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Konfirmasi Password</Form.Label>
                <Form.Control 
                  type="password"
                  name="confirm_password"
                  value={confirmPassword || ''}
                  onChange={(e) => handleChange(e, setConfirm, setErrorConfirm, 'confirm password')}
                  // errorMessage={errorConfirm}
                  placeholder="Masukkan password" 
                />
              </Form.Group>
              <Button 
                variant="primary" 
                type="submit"
                // onClick={() => setShow(true)}
                style={{width: '100%'}}
                className='mt-3'
              >
                Kirim Password
              </Button>
            </Form>
        </Container>
      </>
    )
  } else {
    return <div></div>
  }
}

export default ResetPassword