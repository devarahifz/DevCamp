import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { MdSpaceDashboard } from 'react-icons/md'
import { MdClass } from 'react-icons/md'
import { BsFillChatDotsFill } from 'react-icons/bs'
import { getKelasByUser } from '../../reducers/kelas_reducer';
import { useDispatch, useSelector } from 'react-redux';
import { getTugas } from '../../reducers/tugas_reducer'

const SideNavbar = () => {
  const dispatch = useDispatch()
  const { kelas } = useSelector((state) => state.kelas)
  const { user } = useSelector((state) => state.user)
  const { tugas } = useSelector((state) => state.tugas)
  const idUser = localStorage.getItem('idUser')

  useEffect(() => {
    (async () => {
      await dispatch(getKelasByUser(idUser))
      await dispatch(getTugas(idUser))
    })()
  }, [])

  const menu = ({ isActive }) => {
    return {
      backgroundColor: isActive ? "#4361EE" : "",
      borderRadius: 10,
      fontFamily: 'Inter, sans-serif',
      color: isActive ? 'white' :'black',
      marginBottom: '0.5rem',
      padding: '1rem 1rem',
    };
  }

  const submenu = ({ isActive }) => {
    return {
      backgroundColor: isActive ? "#4361EE" : "",
      borderRadius: 10,
      fontFamily: 'Inter, sans-serif',
      color: isActive ? 'white' :'black',
      marginBottom: '1rem',
      padding: '1rem 0 1rem 3rem',
    };
  }

  const font = {
    color: 'black',
    padding: '1rem 1rem',
  }

  const style = {
    marginTop: '1rem',
    paddingLeft: '0.5rem',
    paddingRight: '0.5rem',
    marginLeft: '0.5rem',
    marginRight: '0.5rem',
    width: '13%',
    height: '85vh',
    top: 100,
  }

  const icon = {
    marginRight: '0.8rem',
  }

  return (
    <>
      <div className='d-flex flex-column sticky-top overflow-auto' style={style}>
        <NavLink to="/peserta/dashboard" style={menu}><MdSpaceDashboard style={icon} />Dashboard</NavLink>
        <hr/>
        {kelas.map((kelas, index) => {
          if ((kelas.peserta.includes(idUser)) ) {
          // if ((kelas.peserta.includes(parseInt(idUser))) )
          return (
            <>
            <div style={font}><BsFillChatDotsFill style={icon} />Forum Diskusi</div >
            {user.isPengajar != true && <NavLink to={`/peserta/forum-diskusi/${kelas.nama_kelas}`} style={submenu}>Diskusi Peserta</NavLink >}
            <NavLink to={`/peserta/forum-diskusi-pengajar/${kelas.nama_kelas}`} style={submenu}>Diskusi Pengajar</NavLink >
            <div disabled style={font}><MdClass style={icon} />Kelas</div >
            <NavLink key={index+1} to={`/peserta/kelas/${kelas.nama_kelas}`} style={submenu} >{kelas.nama_kelas}</NavLink>
            {kelas.materi.map((materi, index) => {
              const nextMateri = kelas.materi[user.tugas_peserta?.length]
              if (materi.materi_id.status == true) {
                if (tugas.filter((tugas) => tugas.materi == materi.materi_id.id).length != 0) {
                  return (
                    <NavLink key={index+1} to={`/peserta/materi/${materi.materi_id.id}`} style={submenu} >Materi Ke - {index+1}</NavLink>
                  )
                }
                else if (nextMateri?.materi_id.id == materi.materi_id.id) {
                  return (
                    <NavLink key={index+1} to={`/peserta/materi/${materi.materi_id.id}`} style={submenu} >Materi Ke - {index+1}</NavLink>
                  )
                }
              }
            })}
            </>
          )
          }
        })}
      </div>
    </>
  )
}

export default SideNavbar