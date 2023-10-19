import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { fetchMateri } from '../../reducers/materi_reducer'
import { getNilaiHarian, postFeedback, deleteNilaiHarian } from '../../reducers/nilaiHarian_reducer'
import { deleteTugas } from '../../reducers/tugas_reducer'
import { useDispatch, useSelector } from 'react-redux'
import parse from 'html-react-parser'
import { url } from '../../configs/public_url'
import { Modal, Form, FormControl } from 'react-bootstrap'
import { Button, IconButton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';

const Content = () => {
  const style = {
    card: {
      textAlign: 'justify', 
      background: 'white', 
      borderRadius: 10, 
      padding: 25,
      margin: '0 0 20px 0'
    }
  }

  let { id } = useParams()
  const dispatch = useDispatch()
  const { kelas } = useSelector((state) => state.kelas)
  const { materi } = useSelector((state) => state.materi)
  const { user } = useSelector((state) => state.user)
  const { nilaiHarian } = useSelector((state) => state.nilaiHarian)
  const idUser = localStorage.getItem('idUser')
  const nilaiId = localStorage.getItem('nilai')
  const [file, setFile] = useState([])
  const [nilai, setNilai] = useState([])
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    file: null,
  })

  const [formDataFeedback, setFormDataFeedback] = useState({
    feedback: "",
  })

  const [formDataLink, setFormDataLink] = useState({
    link: null,
  })

  useEffect(() => {
    (async () => {
      await dispatch(fetchMateri())
      await dispatch(getNilaiHarian())
    })()
  }, [dispatch])

  useEffect(() => {
    fetch(`${url}/items/tugas_peserta`)
      .then((res) => res.json())
      .then((resJson) => {
        const test = resJson.data.filter((item) => item.idUser == idUser && item.materi == id)
        setFile(test)
      })
      .catch((err) => console.log(err))
  }, [id])

  const onSubmit = (e) => {
    (async () => {
      e.preventDefault()

      if (formData.file == null) {
        const submitTugas = await fetch(`${url}/items/tugas_peserta`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            idUser: idUser,
            nama: user.nama_lengkap,
            email: user.email,
            tugas: null,
            nama_file: null,
            materi: id,
            link: formDataLink.link
          })
        })

        const submitNilai = await fetch(`${url}/items/nilai_harian`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            peserta: idUser,
            materi: id
          })
        })

        const resSubmitTugas = await submitTugas.json()
        const resSubmitNilai = await submitNilai.json()

        setFile([...file, resSubmitTugas.data]);
        setNilai([...nilai, resSubmitNilai.data]);

        await dispatch(getNilaiHarian())
        navigate(`/peserta/kelas/${kelas[0].nama_kelas}`)
        return
      } else if (formData.file.size > 5000000) {
        alert('File terlalu besar, maksimal 5MB')
        return
      } else {
        const form = new FormData()
        // for local
        // let folderId = "dc4c5322-9e98-407b-aae2-35cb254c7ea4"
        
        // for deploy
        let folderId = "3497be16-01c2-4540-8154-09aa831acf01"
        form.append('folder', folderId)
        form.append("file", formData.file)
  
        let tugasId = await fetch(`${url}/files`, {
          method: 'POST',
          body: form
        })
        const resJson = await tugasId.json()
        const submitTugas = await fetch(`${url}/items/tugas_peserta`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            idUser: idUser,
            nama: user.nama_lengkap,
            email: user.email,
            tugas: resJson.data.id,
            nama_file: resJson.data.filename_download,
            materi: id,
            link: formDataLink.link
          })
        })
  
        const submitNilai = await fetch(`${url}/items/nilai_harian`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            peserta: idUser,
            materi: id
          })
        })
  
        const resSubmitTugas = await submitTugas.json()
        const resSubmitNilai = await submitNilai.json()
  
        setFile([...file, resSubmitTugas.data]);
        setNilai([...nilai, resSubmitNilai.data]);
  
        await dispatch(getNilaiHarian())
        navigate(`/peserta/kelas/${kelas[0].nama_kelas}`)
      }
    })()
  }

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.files[0],
    }))
  }

  const onChangeLink = (e) => {
    setFormDataLink((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmitFeedback = async (e) => {
    e.preventDefault()

    const form = new FormData()
    form.append("id", nilaiId)
    form.append("feedback", formDataFeedback.feedback)
    
    await dispatch(postFeedback(form))
    setFormDataFeedback({
      feedback: "",
    })

    await dispatch(getNilaiHarian())
  }

  const onChangeFeedback = (e) => {
    setFormDataFeedback((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onDeleteTugas = async (id, idFile) => {
    const tugasId = idFile
    // const nilai = parseInt(localStorage.getItem('nilai'))

    await dispatch(deleteTugas(id))
    await dispatch(deleteNilaiHarian(nilaiId))

    await fetch(`${url}/files/${tugasId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    })
    await dispatch(getNilaiHarian())

    setFile(file.filter((item) => item.id !== id))
    handleCloseDelete()
  }

  const [showDelete, setShowDelete] = useState(false);
  const handleCloseDelete = () => setShowDelete(false);
  const handleShowDelete = () => setShowDelete(true);
  
  return (
    <div className='row'>
      {materi.map((materi, index) => {
        if (materi.id == id) {
          return (
            <div className='col'>
              <div style={style.card}>
                <h3 style={{margin: 0}}>{materi.judul_materi}</h3>
              </div>
                
              <Form key={index} onSubmit={onSubmit}>
                <div style={style.card}>
                  {parse("<p>" + materi.isi_materi + "</p>")}
                </div>
                
                <div style={style.card}>
                  {parse("<p>" + materi.tugas + "</p>")}
                  <div className='row'>
                    <div className="col-9">
                      <Form.Group controlId="formFileLg">
                        <Form.Control 
                          id="file"
                          type="file"
                          name="file"
                          accept='.rar, .zip'
                          onChange={onChange}
                          disabled={file.length > 0 ? true : false}
                          />
                          <small className='text-muted'>File Maksimal 5MB</small>
                      </Form.Group>
                      <Form.Group className='mt-3'>
                        <Form.Label>Alternatif Link (optional)</Form.Label>
                        <Form.Control 
                          type='url'
                          name='link'
                          placeholder='Masukkan link alternatif'
                          disabled={file.length > 0 ? true : false}
                          onChange={onChangeLink}
                          value={formDataLink.link}
                        />
                      </Form.Group>
                    </div>
                    <Button
                      type="submit"
                      variant='contained'
                      className="col-2 my-auto mx-auto h-50"
                      sx={{backgroundColor: '#3f51b5', color: 'white'}}
                      disabled={file.length > 0 ? true : false}
                      >
                      Submit
                    </Button>
                    <div className='col-8'></div>
                  </div>
                </div>

              </Form>
            </div>
          )
        }
      })}
      
      <div className='col-3'>
        <div className='text-center' style={style.card}>
          <h5>Tugas yang Dikumpulkan</h5>
          <hr/>
          {
            file.length === 0 ? 
            <p>Belum ada tugas yang dikumpulkan</p> :
            file.map((file, index) => {
              if (file.materi != id) {
                return (
                  <div key={index}>
                    <p>Belum ada tugas yang dikumpulkan</p>
                  </div>
                )
              } else {
                return (
                  <>
                    <div key={index} className='text-center'>
                      <p>{file.nama_file}</p>
                      {
                        file.link != null ?
                        <>
                          <a href={file.link}>Link Tugas</a>
                          <br/>
                        </> :
                        null
                      }
                      <IconButton onClick={handleShowDelete}>
                        {
                          nilaiHarian.filter((item) => item.peserta == idUser && item.materi == id).map((item) => {
                            if (item.nilai == null) {
                              return <DeleteIcon sx={{color: 'red'}}/>
                            }
                            return (
                              <DeleteIcon sx={{color: 'red', display: 'none'}}/>
                            )
                          })
                        }
                      </IconButton>
                    </div>
                    <Modal show={showDelete} onHide={handleCloseDelete} backdrop="static" keyboard={false} centered>
                      <Modal.Body className='p-5'>
                        <div style={{textAlign: 'center', marginTop: '0px'}} >
                            <Modal.Title style={{fontSize: '36px', fontWeight: 'bold', width: '100%'}}>Yakin ingin dihapus ?</Modal.Title>
                        </div>
                        <div className='text-center mt-2'>
                          <Button variant='contained' color='error' className='w-100' onClick={() => onDeleteTugas(file.id, file.tugas)}>
                            YA
                          </Button>
                        </div>
                        <div className='text-center mt-2'>
                          <Button variant='contained' className='w-100' onClick={handleCloseDelete}>
                            TIDAK
                          </Button>
                        </div>
                      </Modal.Body>
                    </Modal>
                  </>
                )
              }
            })
          }
        </div>
        
        <div style={style.card}>
          <h4 className='text-center'>Nilai Anda</h4>
          <hr/>
          {
            file.length === 0 ?
            <p style={{fontSize: '18px', fontWeight: 'bold', width: '100%', textAlign: 'center'}}>Tugas Anda belum dinilai</p> :
            nilaiHarian.filter((item) => item.peserta == idUser && item.materi == id).map((item, index) => {
              localStorage.setItem('nilai', item.id)
              if (item.nilai == null) {
                return (
                  <p key={index} style={{fontSize: '18px', fontWeight: 'bold', width: '100%', textAlign: 'center'}}>Tugas Anda belum dinilai</p>
                )
              }
              return (
                <p key={index} style={{fontSize: '24px', fontWeight: 'bold', width: '100%', textAlign: 'center'}}>{item.nilai}</p>
              )
            })
          }
        </div>
          
        <div style={style.card}>
          <h4 className='text-center'>Beri Feedback</h4>
          <hr/>
          <Form onSubmit={onSubmitFeedback}>
            {
              file.length == 0 ?
              <>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                  <Form.Control as="textarea" rows={5} name='feedback' value={formDataFeedback.feedback} onChange={onChangeFeedback} disabled/>
                </Form.Group>
                <div className='mt-5'>
                  <Button type='submit' className='w-100' variant='contained' color='warning' disabled>Beri Feedback</Button>
                </div>
              </>
              :
              nilaiHarian.filter((item) => item.peserta == idUser && item.materi == id && item.id == nilaiId).map((item, index) => {
                if (item.nilai == null || item.feedback != null) {
                  return (
                    <>
                      <Form.Group className="mb-3" controlId={`exampleForm.ControlTextarea${index}`}>
                        <Form.Control as="textarea" rows={5} name='feedback' value={item.feedback} onChange={onChangeFeedback} disabled/>
                      </Form.Group>
                      <div className='mt-5'>
                        <Button type='submit' className='w-100' variant='contained' color='warning' disabled>Beri Feedback</Button>
                      </div>
                    </>
                  )
                } else {
                  return (
                    <>
                      <Form.Group className="mb-3" controlId={`exampleForm.ControlTextarea1${index}`}>
                        <Form.Control as="textarea" rows={5} name='feedback' value={formDataFeedback.feedback} onChange={onChangeFeedback}/>
                      </Form.Group>
                      <div className='mt-5'>
                        <Button type='submit' className='w-100' variant='contained' color='warning'>Beri Feedback</Button>
                      </div>
                    </>
                  )
                }
              })
            }
          </Form>
        </div>

      </div>
      
    </div>
  )
}

export default Content