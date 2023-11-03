import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import NavbarLanding from '../../components/header/NavbarLanding'
import Footer from '../../components/footer/FooterComponent'
import "./style.css"
import { Button, Row, Col, Container } from 'react-bootstrap'
import CarouselComponent from '../../components/carousel/CarouselComponent'
import { getGroup1, getGambar } from '../../reducers/konten/group1_reducer'
import { getGroup2 } from '../../reducers/konten/group2_reducer'
import { getGroup3 } from '../../reducers/konten/group3_reducer'
import { getGroup4 } from '../../reducers/konten/group4_reducer'

const LandingPage = () => {
  const dispatch = useDispatch()
  const { group1 } = useSelector(state => state.group1)
  const { group2 } = useSelector(state => state.group2)
  const { group3 } = useSelector(state => state.group3)
  const { group4 } = useSelector(state => state.group4)

  useEffect(() => {
    dispatch(getGroup1())
    dispatch(getGroup2())
    dispatch(getGroup3())
    dispatch(getGroup4())
  }, [dispatch])

  const background = {
    background: `url(${getGambar(group1.background)})`,
    height: '750px',
  }

  return (
    <>
    <NavbarLanding />
      <div className='mx-auto' style={{minHeight: '100vh'}}>
        <div style={background} className="position-relative" >
          <div className='mx-5 px-5 position-absolute' style={{color: 'white', marginTop: '10%'}}>
              <h1 className='text-center mx-auto' style={{fontSize:'36px', width: '35%'}}>
                {group1.judul}
              </h1>
              <p className='text-center mx-auto my-5' style={{fontSize:'20px', width: '60%'}}>
                {group1.deskripsi}
              </p>
          </div>
        </div>
          <Row className='align-items-center my-5 py-5' style={{margin: '0 10%'}}>
            <Col className='text-center'>
              <img src={getGambar(group2.gambar)} width={420} alt={group2.judul}/>
            </Col>
            <Col>
              <h1 style={{fontSize: '48px', fontWeight: 'bold'}}>
                {group2.judul}
              </h1>
              <p className='my-3' style={{fontSize: '24px'}}>
                {group2.deskripsi}
              </p>
            </Col>
          </Row>

          <div className='text-center' style={{background: '#F4F4F5', padding: '3% 0'}}>
            <h1 className='mb-5'><b>DevCamp</b></h1>
            <CarouselComponent />
          </div>
          
          <div className='container' style={{marginTop: '10%'}}>
            <Row className='align-items-baseline'>
              <Col xs={8} className='align-items-center'>
                <h1 style={{fontWeight: 'bold'}}>{group3.judul_hitam}</h1>
                <h1 style={{color: '#0D6EFD', fontWeight: 'bold'}}>{group3.judul_biru}</h1>
                <p className='mt-5'>
                  {group3.deskripsi}
                </p>
              </Col>
              <Col className='text-center'>
                <img src={getGambar(group3.gambar)} alt={group3.judul_gambar} style={{width: '254px'}} />
                <h4 className='mt-5'>{group3.judul_gambar}</h4>
                <p className='mt-5'>{group3.deskripsi_gambar}</p>
              </Col>
            </Row>
          </div>

          <div style={{marginTop: '10%'}}>
            <Row style={{margin: '0 10%'}}>
              <Col className='text-center'>
                <img src={getGambar(group4.gambar)} alt={group4.judul} style={{width: '500px'}} />
              </Col>
              <Col className='align-self-center'>
                <h1 style={{fontWeight: 'bold'}}>{group4.judul_hitam}</h1>
                <h1 style={{fontWeight: 'bold', color: '#0D6EFD'}}>{group4.judul_biru}</h1>
                <p className='my-5'>
                  {group4.deskripsi}
                </p>
              </Col>
            </Row>
          </div>

          <div className='container' style={{marginTop: '10%'}}>
            <h1 className='text-center' style={{fontWeight: 'bold', marginBottom: '10%'}}>Apa saja keuntungannya <span style={{fontWeight: 'bold', color: '#0D6EFD'}}>Jika Bergabung?</span></h1>
            <Row className=''>
              <Col xs={4} className='pe-5'>
                <h1 style={{fontWeight: 'bold'}}>Online <span style={{fontWeight: 'bold', color: '#0D6EFD'}}>Bootcamp</span></h1>
                <p className='mt-5 mb-5 pe-4'>Bootcamp online akan dilakukan intensif selama 1 bulan bagi seluruh peserta.</p>
                <img src={require('../../assets/images/bootcamp.png')} alt="" />
              </Col>
              <Col xs={8} className='align-self-center'>
                <Row>
                  <Col className='pt-2 pe-3'>
                    <div className='d-flex'>
                      <div>
                        <img src={require('../../assets/images/icon-1.png')} alt="" />
                      </div>
                      <div className='ms-4'>
                        <h2 style={{color: '#F98C23'}}>Pelatihan Intensif</h2>
                        <p>Pelatihan selama 1 bulan untuk seluruh peserta.</p>
                      </div>
                    </div>
                    
                    <div className='d-flex mt-5'>
                      <div>
                        <img src={require('../../assets/images/icon-2.png')} alt="" />
                      </div>
                      <div className='ms-4'>
                        <h2 style={{color: '#D73F7D'}}>Akses Materi Selamanya</h2>
                        <p>Dapatkan akses materi belajar gratis (open educational resources) yang bisa diakses kapan saja ketika peserta sudah menyelesaikan semua materi.</p>
                      </div>
                    </div>
                  </Col>
                  <Col className='pt-2 ps-3'>
                    <div className='d-flex'>
                      <div>
                        <img src={require('../../assets/images/icon-3.png')} alt="" />
                      </div>
                      <div className='ms-4'>
                        <h2 style={{color: '#B344B1'}}>Mentorship</h2>
                        <p>Kesempatan untuk bertanya secara langsung bersama mentor yang berpengalaman di bidangnya.</p>
                      </div>
                    </div>

                    <div className='d-flex mt-5'>
                      <div>
                        <img src={require('../../assets/images/icon-4.png')} alt="" />
                      </div>
                      <div className='ms-4'>
                        <h2 style={{color: '#686ADB'}}>Forum Diskusi</h2>
                        <p>Peserta dapat berdiskusi dengan peserta lain pada kelas yang sama dalam fitur disuksi yang sudah disediakan.</p>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>

          <h1 className='mx-auto text-center pb-5' style={{width: '20%', fontWeight: 'bold', marginTop: '10%'}}>Pilihan Kelas di DevCamp</h1>
          <Row className='my-5 pb-5'>
            <Col className='text-center'>
              <img className='w-50' src={require('../../assets/images/karyawan.png')} alt="" />
              <h4>Kelas Karyawan</h4>
            </Col>
            <Col className='text-center'>
              <img className='w-50' src={require('../../assets/images/profesional.png')} alt="" />
              <h4>Kelas Profesional</h4>
            </Col>
            <Col className='text-center'>
              <img className='w-50' src={require('../../assets/images/bisnis1.png')} alt="" />
              <h4>Kelas Bisnis</h4>
            </Col>
          </Row>
      </div>
    <Footer />
    </>
  )
}

export default LandingPage