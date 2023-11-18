import React, { useEffect, useState } from 'react'
import NavbarDashboard from '../../components/header/NavbarDashboard'
import { useDispatch, useSelector } from 'react-redux'
import { getUserById, updateUser, updatePassword, getFoto } from '../../reducers/user_reducer'
import { AiFillEyeInvisible } from 'react-icons/ai'
import { Button, Modal, Form } from "react-bootstrap";
import { MdArrowForwardIos } from 'react-icons/md'
import { url } from '../../configs/public_url'

const Profile = () => {
  const { user } = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const idUser = localStorage.getItem('idUser')

  const [imagePreview, setImagePreview] = useState(null)
  const [formData, setFormData] = useState({
    nama_lengkap: "",
    email: "",
    foto: "",
    tempat_lahir: "",
    tanggal_lahir: "",
    jenis_kelamin: "",
    nomor_telepon: "",
    alamat: "",
    pendidikan_terakhir: "",
    domisili: "",
  })

  const [formDataPassword, setFormDataPassword] = useState({
    kata_sandi: "",
    confirm_kata_sandi: "",
  })

  useEffect(() => {
    (async () => {

      const data = await dispatch(getUserById(idUser))

      setFormData({
        nama_lengkap: data.payload.nama_lengkap,
        email: data.payload.email,
        foto: data.payload.foto,
        tempat_lahir: data.payload.tempat_lahir,
        tanggal_lahir: data.payload.tanggal_lahir,
        jenis_kelamin: data.payload.jenis_kelamin,
        nomor_telepon: data.payload.nomor_telepon,
        alamat: data.payload.alamat,
        pendidikan_terakhir: data.payload.pendidikan_terakhir,
        domisili: data.payload.domisili,
      })
      
      setFormDataPassword({
        kata_sandi: "",
        confirm_kata_sandi: "",
      })
    })()
  }, [])

  const onSubmitFoto = async (e) => {
    e.preventDefault()
    const form = new FormData()
    // for local
    // let folderId = "1cf9ed6d-3efe-4e8f-a16e-fa3519e155dc"

    // for deploy
    let folderId = "82aa41cd-2b41-4e6c-9268-9bd198ab166a"
    form.append('folder', folderId)
    form.append("file", formData.file)
    console.log(form)
    let fotoId = await fetch(`${url}/files`, {
      method: "POST",
      body: form,
    })
    const resJson = await fotoId.json()
    const updateUser = await fetch(`${url}/items/user/${idUser}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        foto: resJson.data.id,
      }),
    })
    setShowEditFoto(false)
    const resUpdateUser = await updateUser.json()
    return resUpdateUser
  }

  const onSubmit = async (e) => {
      e.preventDefault()

      // const dateCreated = new Date(user.date_created)
      // dateCreated.setDate(dateCreated.getDate() + 30);

      // const dateActive = dateCreated.toISOString()

      const form = new FormData()
      form.append("id", idUser)
      form.append("nama_lengkap", formData.nama_lengkap)
      form.append("email", formData.email)
      form.append("tempat_lahir", formData.tempat_lahir)
      form.append("tanggal_lahir", formData.tanggal_lahir)
      form.append("jenis_kelamin", formData.jenis_kelamin)
      form.append("nomor_telepon", formData.nomor_telepon)
      form.append("alamat", formData.alamat)
      form.append("pendidikan_terakhir", formData.pendidikan_terakhir)
      form.append("domisili", formData.domisili)
      
      await dispatch(updateUser(form))
      
      // await fetch(`${url}/items/user/${idUser}`, {
      //   method: 'PATCH',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     date_active: dateActive
      //   })
      // })
      if (user.foto == null) {
        alert('Silahkan upload foto profil terlebih dahulu')
      }
      else {
        alert('Data berhasil diubah')
      }

  }

  const onSubmitPassword = (e) => {
    (async () => {
      e.preventDefault()
      const form = new FormData()
      form.append("id", idUser)
      form.append("kata_sandi", formDataPassword.kata_sandi)
      form.append("confirm_kata_sandi", formDataPassword.confirm_kata_sandi)
      await dispatch(updatePassword(form))
      
      setFormDataPassword({
        kata_sandi: "",
        confirm_kata_sandi: "",
      })

      setShow(false)
    })()
  }

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
    setFormDataPassword((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.files[0],
    }))
    setImagePreview(URL.createObjectURL(e.target.files[0]))
  }

  const handleShowPassword = () => {
    const password = document.getElementById('password')
    
    if (password.type === 'password') {
      password.type = 'text'
    } else {
      password.type = 'password'
    }
  } 
  
  const handleShowConfirmPassword = () => {
    const verifyPassword = document.getElementById('verifyPassword')
    
    if (verifyPassword.type === 'password') {
      verifyPassword.type = 'text'
    } else {
      verifyPassword.type = 'password'
    }
  }

  const [showEditFoto, setShowEditFoto] = useState(false);
  const handleCloseEditFoto = () => setShowEditFoto(false);
  const handleShowEditFoto = () => setShowEditFoto(true);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showAlert, setShowAlert] = useState(false);
  const handleCloseAlert = () => setShowAlert(false);
  const handleShowAlert = () => setShowAlert(true);

  console.log(formData.jenis_kelamin)
  return (
    <>
      <div>
      <NavbarDashboard />
        <div className='container row d-flex mx-auto mt-5 w-full'>
          <div className='col-8 offset-2'>
            <h1 className='text-center fw-bold mb-5 pb-3 title'>Edit Profil</h1>
          </div>
          <div className='col-2'>
            <Button onClick={handleShow} className='float-right W-100 d-none d-sm-inline-flex' style={{color: '#4361EE', background: 'none', border: 'none', alignItems: 'center', display: 'flex', fontWeight: '500'}}>GANTI PASSWORD  <MdArrowForwardIos /></Button>
          </div>
        </div>
        <form onSubmit={onSubmit} className='container-profile-musisi mx-auto' style={{maxWidth:'50%',minWidth: "300px", marginRight: '400px',marginLeft:'400px', marginTop:'32px' , marginBottom:'64px'}}>
          <p> Foto Profil </p>
          <div className='row mx-auto'>
            <div className='col-12 col-md-4'>
            {
              imagePreview 
              ?
              <img src={imagePreview} className="mb-3" style={{width:'200px',height:'200px', borderRadius:'999px', objectFit:'cover', objectPosition:'center'}} alt={user.nama_lengkap}></img>
              :
              <img src={getFoto(user.foto)} className="mb-3" style={{width:'200px',height:'200px', borderRadius:'999px', objectFit:'cover', objectPosition:'center'}} alt={user.nama_lengkap}></img>
            }
            </div>
            <div className='col mt-5'>
              <Button onClick={handleShowEditFoto} className='float-right W-100 d-none d-sm-inline-flex' style={{color: '#4361EE', background: 'none', border: 'none', alignItems: 'center', display: 'flex', fontWeight: '500'}}>GANTI FOTO PROFIL  <MdArrowForwardIos /></Button>
            </div>
          </div>
          <p className='m-0'>Nama</p>
          <input 
            className='w-100  p-2 mb-3' 
            style={{border:'2px solid #ECECEC', borderRadius:'8px',  height:'48px'}} 
            type="text" 
            name="nama_lengkap"
            value={formData.nama_lengkap}
            onChange={onChange}
            required
          />
          <p className='m-0'>Email</p>
          <input 
            className='w-100  p-2 mb-3' 
            style={{border:'2px solid #ECECEC', borderRadius:'8px',  height:'48px'}} 
            type="email" 
            name="email"
            value={formData.email}
            onChange={onChange}
            disabled
          />
          <div className='row'>
            <div className='col'>
              <p className='m-0'>Tempat Lahir</p>
              <input 
                className='w-100  p-2 mb-3' 
                style={{border:'2px solid #ECECEC', borderRadius:'8px',  height:'48px'}} 
                type="text" 
                name="tempat_lahir"
                value={formData.tempat_lahir}
                onChange={onChange}
                required
                />
            </div>
            <div className='col'>
              <p className='m-0'>Tanggal Lahir</p>
              <input 
                className='w-100  p-2 mb-3' 
                style={{border:'2px solid #ECECEC', borderRadius:'8px',  height:'48px'}} 
                type="date" 
                name="tanggal_lahir"
                value={formData.tanggal_lahir}
                onChange={onChange}
                required
                />
            </div>
          </div>
          <div className='row'>
            <div className='col'>
              <p className='m-0'>Jenis Kelamin</p>
              <div className='form-check form-check-inline mt-3'>
                <input 
                  className='form-check-input' 
                  // style={{border:'2px solid #ECECEC', borderRadius:'8px'}} 
                  type="radio" 
                  name="jenis_kelamin"
                  value="Lk"
                  checked={formData.jenis_kelamin === 'Lk'}
                  onChange={onChange}
                  id='Lk'
                  required
                  />
                <label className='form-check-label' for='Lk'>Laki-laki</label>
              </div>
              <div className='form-check form-check-inline mt-3'>
                <input 
                  className='form-check-input' 
                  // style={{border:'2px solid #ECECEC', borderRadius:'8px',  height:''}} 
                  type="radio" 
                  name="jenis_kelamin"
                  value="Pr"
                  checked={formData.jenis_kelamin === 'Pr'}
                  onChange={onChange}
                  id='Pr'
                  required
                  />
                <label className='form-check-label' for='Pr'>Perempuan</label>
              </div>
            </div>
            <div className='col'>
              <p className='m-0'>Nomor Telepon</p>
              <input 
                className='w-100  p-2 mb-3' 
                style={{border:'2px solid #ECECEC', borderRadius:'8px',  height:'48px'}} 
                type="tel" 
                name="nomor_telepon"
                value={formData.nomor_telepon}
                onChange={onChange}
                pattern='[0-9]{12,13}'
                required
                />
            </div>
          </div>
          <p className='m-0'>Alamat</p>
          <input 
            className='w-100  p-2 mb-3' 
            style={{border:'2px solid #ECECEC', borderRadius:'8px',  height:'48px'}} 
            type="text" 
            name="alamat"
            value={formData.alamat}
            onChange={onChange}
            required
          />
          <div className='row'>
            <div className='col'>
              <p className='m-0'>Pendidikan Terakhir</p>
              <input 
                className='w-100  p-2 mb-3' 
                style={{border:'2px solid #ECECEC', borderRadius:'8px',  height:'48px'}} 
                type="text" 
                name="pendidikan_terakhir"
                value={formData.pendidikan_terakhir}
                onChange={onChange}
                required
                />
            </div>
            <div className='col'>
              <p className='m-0'>Domisili</p>
              <input 
                className='w-100  p-2 mb-3' 
                style={{border:'2px solid #ECECEC', borderRadius:'8px',  height:'48px'}} 
                type="text" 
                name="domisili"
                value={formData.domisili}
                onChange={onChange}
                required
                />
            </div>
          </div>
          <Button onClick={handleShow} className='float-right W-100 d-block d-sm-none p-0 py-1' style={{color: '#4361EE', background: 'none', border: 'none', alignItems: 'center', display: 'flex', fontWeight: '500'}}>GANTI PASSWORD  <MdArrowForwardIos /></Button>
          
          <button type='submit' className='btn btn-primary w-100 mb-1' style={{background: '#4361EE'}}>SIMPAN</button>
          <a onClick={handleShowAlert} className='btn btn-light w-100' style={{backgroundColor: '#ECECEC', color: '#4361EE'}}>KEMBALI</a>
        </form>

        <Modal show={showAlert} onHide={handleCloseAlert} backdrop="static" keyboard={false} style={{width: '20%', margin: '0 40%'}} >
          <Modal.Body className='py-5 text-center'>
            <div className='mb-3'>
              <Modal.Title>Anda Yakin ?</Modal.Title>
            </div>
            <Button href={`/peserta/dashboard`} variant="danger" type="submit" className='me-2' style={{width: '35%'}} >
              YA
            </Button>
            <Button onClick={handleCloseAlert} variant="primary" type="submit" className='ms-2' style={{background: '', width: '35%'}} >
              TIDAK
            </Button>
          </Modal.Body>
        </Modal>

        <Modal show={showEditFoto} onHide={handleCloseEditFoto} backdrop="static" keyboard={false} centered>
          <Modal.Body className='p-5'>
            <div style={{textAlign: 'center', marginTop: '0px'}}>
                <Modal.Title style={{fontSize: '36px', fontWeight: 'bold', width: '100%'}}>Ganti Foto</Modal.Title>
            </div>
            <Form onSubmit={onSubmitFoto}>
              <Form.Group className="mb-3 mt-4 position-relative">
                <div className='row mx-auto'>
                  <div className='col-12 col-md-4'>
                  {
                    imagePreview 
                    ?
                    <img src={imagePreview} className="mb-3" style={{width:'200px',height:'200px', borderRadius:'999px', objectFit:'cover', objectPosition:'center'}} alt={user.nama_lengkap}></img>
                    :
                    <img src={getFoto(user.foto)} className="mb-3" style={{width:'200px',height:'200px', borderRadius:'999px', objectFit:'cover', objectPosition:'center'}} alt={user.nama_lengkap}></img>
                  }
                  </div>
                  <div className='col mt-5'>
                    <input 
                      className='btn btn-light fw-semibold mb-2' 
                      style={{border: '2px solid #4361EE' , color: '#4361EE',width: '250px'}}
                      type="file" 
                      name="file"
                      onChange={handleChange}
                    />
                    <p className='text-muted pt-2 ps-2' style={{fontSize:'16px'}}>Ukuran foto maksimal 5mb</p>
                  </div>
                </div>
              </Form.Group>
              <div className='text-center mt-5'>
                <Button variant="primary" type="submit" className='w-100' style={{background: '#4361EE'}} >
                  SIMPAN
                </Button>
              </div>
            </Form>
            <div className='text-center mt-2'>
              <Button onClick={handleCloseEditFoto} className='w-100 btn-light' style={{background: '#ECECEC', color: '#4361EE'}}>
                BATAL
              </Button>
            </div>
          </Modal.Body>
        </Modal>

        <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} centered>
          <Modal.Body className='p-5'>
            <div style={{textAlign: 'center', marginTop: '0px'}}>
                <Modal.Title style={{fontSize: '36px', fontWeight: 'bold', width: '100%'}}>Ganti Password</Modal.Title>
            </div>
            <Form onSubmit={onSubmitPassword}>
              <Form.Group className="mb-3 mt-4 position-relative">
                <Form.Label>Password</Form.Label>
                <Form.Control 
                  style={{border:'2px solid #ECECEC', borderRadius:'8px',  height:'48px'}} 
                  id="password"
                  type="password" 
                  name="kata_sandi"
                  value={formDataPassword.kata_sandi}
                  onChange={onChange}
                />
                <span style={{right: '20px', top: '55%', color: 'grey'}} className='position-absolute' onClick={handleShowPassword}>
                  <AiFillEyeInvisible/>
                </span>
              </Form.Group>
              <Form.Group className="mb-3 position-relative">
                <Form.Label>Konfirmasi Password</Form.Label>
                <Form.Control 
                  style={{border:'2px solid #ECECEC', borderRadius:'8px', maxWidth:'640px', height:'48px'}} 
                  id="verifyPassword"
                  type="password" 
                  name="confirm_kata_sandi"
                  value={formDataPassword.confirm_kata_sandi}
                  onChange={onChange}
                />
                <span style={{right: '20px', top: '55%', color: 'grey'}} className='position-absolute' onClick={handleShowConfirmPassword}>
                  <AiFillEyeInvisible/>
                </span>
              </Form.Group>
              <div className='text-center mt-5'>
                <Button variant="primary" type="submit" className='w-100' style={{background: '#4361EE'}} >
                  SIMPAN
                </Button>
              </div>
            </Form>
            <div className='text-center mt-2'>
              <Button onClick={handleClose} className='w-100 btn-light' style={{background: '#ECECEC', color: '#4361EE'}}>
                BATAL
              </Button>
            </div>
          </Modal.Body>
        </Modal>
    </div>
    </>
  )
}

export default Profile