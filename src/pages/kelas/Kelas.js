import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getAssetURL, getKelasByUser } from '../../reducers/kelas_reducer'
import { useDispatch, useSelector } from 'react-redux'
import Overview from './Overview'
import { getTugas } from '../../reducers/tugas_reducer'
import { getUserById } from '../../reducers/user_reducer'
import { url } from '../../configs/public_url'
import { ProgressBar } from 'react-bootstrap'
import parse from 'html-react-parser'

const Kelas = () => {
  const style = {
    cover: {
      width: '60%',
      height: 'auto',
      borderRadius: 20,
      padding: '0.5rem 0',
    },
    card: {
      backgroundColor: 'white',
      borderRadius: 10,
      padding: '0.5rem 1rem',
      margin: '0 1rem 1rem 0',
      height: 'auto',
    },
    progress: {
      backgroundColor: '#6bc99d', 
      height: 'auto', 
      fontSize: '15px',
      color: 'black',
      // border: '5px solid white'
    }
  }

  let { name } = useParams()
  const dispatch = useDispatch()
  const { kelas } = useSelector((state) => state.kelas)
  const { tugas } = useSelector((state) => state.tugas)
  const { user } = useSelector((state) => state.user)
  const idUser = localStorage.getItem('idUser')
  const progressRes = useRef(0)
  const [ progressBar, setProgressBar ] = useState(0)

  useEffect(() => {
    dispatch(getKelasByUser(idUser))
    dispatch(getUserById(idUser))
    dispatch(getTugas(idUser))
  }, [])

  useEffect(() => {
    (async() => {
      let progress = 0
      let total = 0
      let totalMateri = 0
      let totalTugas = tugas.filter((tugas) => tugas.idUser == idUser).length
      let totalNilai = 0
      let totalNilaiHarian = 0
      let totalNilaiAkhir = 0

      kelas.map((kelas) => {
        kelas.materi.map((materi) => {
          if (kelas.id == user.kelas.id && materi.materi_id.status == true) {
            totalMateri += 1
          }
        })
      })

      total = (totalTugas / totalMateri) * 100
      progress = Math.round(total) + "%"
      progressRes.current.innerText = progress
      setProgressBar(Math.round(total))

      await fetch(`${url}/items/user/${idUser}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          progress: progress
        })
      })

    })()
  })

  return (
    <>
      {kelas.map((kelas, index) => {
        if (kelas.nama_kelas === name) {
          if (!(kelas.peserta.includes(idUser)) ) {
          // if (!(kelas.peserta.includes(parseInt(idUser))) ) {
            window.location.href = '/peserta/dashboard'
          }
          return (
            <div key={index}>
              <div className='row'>
                <div className='col'>
                  <div style={style.card}>
                    <h3 style={{margin: 0, fontWeight: '600'}}>{kelas.nama_kelas}</h3>
                  </div>
                  <div className='text-center' style={style.card}>
                    <img src={getAssetURL(kelas.cover)} alt={kelas.nama_kelas} style={style.cover}/>
                  </div>
                </div>
                <div className='col' style={style.card}>
                  <h4 style={{fontWeight: '600'}}>Deskripsi</h4>
                  <hr/>
                  <div style={{textAlign: 'justify'}}>{parse('<p>' + kelas.deskripsi + '</p>')}</div>
                </div>
              </div>
              <h5>Progress : 
                <span ref={progressRes} style={{display:'none'}}></span>
              </h5>
              <ProgressBar now={progressBar} label={`${progressRes.current.innerText}`} style={style.progress} variant='success' striped animated />
              {kelas.materi.map((materi, index) => {
                if (materi.materi_id.status == true) {
                  return (
                    <div key={index}>
                      <Overview 
                        id={materi.materi_id.id}
                        title={materi.materi_id.judul_materi}
                        content={materi.materi_id.isi_materi}
                        tugas={tugas.filter((tugas) => tugas.materi == materi.materi_id.id)}
                      />
                    </div>
                  )
                }
              })}
            </div>
          )
        }
      })}
    </>
  )
}

export default Kelas