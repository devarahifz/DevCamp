import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { fetchKelas, getAssetURL } from '../../reducers/kelas_reducer'
import { useDispatch, useSelector } from 'react-redux'
import Overview from './Overview'

const Kelas = () => {
  let { name } = useParams()
  const dispatch = useDispatch()
  const { kelas } = useSelector((state) => state.kelas)

  useEffect(() => {
    dispatch(fetchKelas())
  }, [])

  return (
    <>
      {kelas.map((kelas, index) => {
        if (kelas.nama_kelas === name) {
          return (
            <div key={index}>
              <h3>{kelas.nama_kelas}</h3>
              <img src={getAssetURL(kelas?.cover)} alt={kelas.nama_kelas} />
              {kelas.materi.map((materi, index) => {
                return (
                  <div key={index}>
                    <Overview 
                      id={materi.materi_id.id}
                      kelas={kelas.nama_kelas}
                      title={materi.materi_id.judul_materi}
                      content={materi.materi_id.isi_materi}
                    />
                  </div>
                )
              })}
            </div>
          )
        }
      })}
    </>
  )
}

export default Kelas