import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import DashboardIcon from '@mui/icons-material/Dashboard';
import ClassIcon from '@mui/icons-material/Class';
import { MdSpaceDashboard } from 'react-icons/md'
import { MdClass } from 'react-icons/md'
import { fetchKelas } from '../../reducers/kelas_reducer';
import { useDispatch, useSelector } from 'react-redux';

const SideNavbar = () => {
  const dispatch = useDispatch()
  const { kelas } = useSelector((state) => state.kelas)

  useEffect(() => {
    dispatch(fetchKelas())
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
      padding: '1rem 2.3rem',
    };
  }

  const font = {
    color: 'black',
    padding: '1rem 1rem',
  }

  const style = {
    marginTop: '1rem',
    marginLeft: '1rem',
    width: '10%',
    height: '100%',
  }

  return (
    <>
      <div className='d-flex flex-column' style={style}>
        <NavLink to="/peserta/dashboard" style={menu}><MdSpaceDashboard /> Dashboard</NavLink>
        <hr/>
        <div eventKey="disabled" disabled style={font}><MdClass /> Kelas</div >
        {kelas.map((kelas, index) => {
          // if (kelas.materi.length > 0) {
            return (
              // <div key={index}>
                <NavLink to={`/peserta/kelas/${kelas.nama_kelas}`} style={submenu}>{kelas.nama_kelas}</NavLink>
                
              // </div>
            )   
          // }
        })}
      </div>
    </>
  )
}

export default SideNavbar