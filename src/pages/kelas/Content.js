import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchMateri } from '../../reducers/materi_reducer'
import { useDispatch, useSelector } from 'react-redux'
import parse from 'html-react-parser'
import { Input } from '@mui/material'
import { url } from '../../configs/public_url'

const Content = () => {
  let { id } = useParams()
  const dispatch = useDispatch()
  const { materi } = useSelector((state) => state.materi)
  // const { auth } = useSelector((state) => state.auth)
  const idUser = localStorage.getItem('idUser')

  const [tugas, setTugas] = useState('')
  const [files, setFiles] = useState({
    tugas: null
  })

  useEffect(() => {
    (async () => {
      await dispatch(fetchMateri(id))
    })()
  }, [dispatch])

  useEffect(() => {
    const idUser = localStorage.getItem('idUser')
    fetch(`${url}/items/materi`)
      .then((res) => res.json())
      .then((json) => {
        const tugas = json.data.filter((item) => item.idUser == idUser)
        setTugas(tugas)
      })
      .catch((err) => console.log(err))
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const file = document.getElementById('file').files[0]
    console.log(file)

    const email = localStorage.getItem('email')
    if (files.tugas !== null) {
      const formData = new FormData()
      formData.append('file', files.tugas)

      let tugasId = await fetch(`${url}/files`, {
        method: 'POST',
        body: formData
      })
      const json = await tugasId.json()
      const submitTugas = await fetch(`${url}/items/materi`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          idUser: idUser,
          email: email,
          file_tugas_peserta: json.data.filename_download,
        })
      })

      const resSubmitTugas = await submitTugas.json()

      return resSubmitTugas
    }
  }

  return (
    <>
      {materi.map((materi, index) => {
        if (materi.id == id) {
          return (
            <div key={index}>
              <h2>{materi.judul_materi}</h2>
              {parse("<p>" + materi.isi_materi + "</p>")}
              {parse("<p>" + materi.tugas + "</p>")}
              <input 
                id="file"
                type="file"
                name="file"
                accept='.pdf,.doc,.docx'
                multiple
              />
              <button
                type="submit"
                className="btn btn-primary"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          )
        }
      })}
    </>
  )
}

export default Content