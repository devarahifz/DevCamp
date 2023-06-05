import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchMateri } from '../../reducers/materi_reducer'
import { useDispatch, useSelector } from 'react-redux'
import parse from 'html-react-parser'
import { url } from '../../configs/public_url'

const Content = () => {
  let { id } = useParams()
  const dispatch = useDispatch()
  const { materi } = useSelector((state) => state.materi)
  const { user } = useSelector((state) => state.user)
  const idUser = localStorage.getItem('idUser')
  const email = localStorage.getItem('email')

  const [formData, setFormData] = useState({
    idUser: idUser,
    nama: '',
    email: email,
    file: null,
  })

  useEffect(() => {
    (async () => {
      await dispatch(fetchMateri(id))
    })()
  }, [dispatch])

  const onSubmit = (e) => {
    (async () => {
      e.preventDefault()

      const form = new FormData()
      let folderId = "dc4c5322-9e98-407b-aae2-35cb254c7ea4"
      form.append('folder', folderId)
      form.append("file", formData.file)
      console.log(formData)
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
          email: email,
          tugas: resJson.data.id
        })
      })
      const resSubmitTugas = submitTugas.json()
      console.log(resJson)
      return resSubmitTugas
    })()
  }

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.files[0],
    }))
  }

  return (
    <>
      {materi.map((materi, index) => {
        if (materi.id == id) {
          return (
            <form key={index} onSubmit={onSubmit}>
              <h2>{materi.judul_materi}</h2>
              {parse("<p>" + materi.isi_materi + "</p>")}
              {parse("<p>" + materi.tugas + "</p>")}
              <input 
                id="file"
                type="file"
                name="file"
                accept='.pdf,.doc,.docx'
                multiple
                onChange={onChange}
                // value={files.tugas}
              />
              <button
                type="submit"
                className="btn btn-primary"
                // onClick={handleSubmit}
              >
                Submit
              </button>
            </form>
          )
        }
      })}
    </>
  )
}

export default Content