import React from 'react'
import NavbarLanding from '../../components/header/NavbarLanding'
import Footer from '../../components/footer/FooterComponent'
import "./style.css"
import { Button, Row, Col, Container } from 'react-bootstrap'
import CarouselComponent from '../../components/carousel/CarouselComponent'

const LandingPage = () => {
  return (
    <>
    <NavbarLanding />
      <div className='mx-auto' style={{minHeight: '100vh'}}>
        <div className="background position-relative" >
          <div className='mx-5 px-5 position-absolute' style={{color: 'white', marginTop: '10%'}}>
              <h1 className='text-center mx-auto' style={{fontSize:'36px', width: '35%'}}>
                Persiapkan Dirimu Demi Meraih Pekerjaan Impianmu !
              </h1>
              <p className='text-center mx-auto my-5' style={{fontSize:'20px', width: '60%'}}>
              DevCamp merupakan Bootcamp pemasaran digital
              yang memberikan pelatihan praktis dan langsung untuk membantu Anda dalam menyiapkan keterampilan pada bidang
              Digital Marketing agar dapat menyiapkan diri dalam bersaing pada dunia kerja nantinya.
              Belajar dari yang terbaik di industri ini dan dapatkan pekerjaan yang Anda inginkan!
              </p>
          </div>
        </div>
          <Row className='align-items-center my-5 py-5' style={{margin: '0 10%'}}>
            <Col className='text-center'>
              <img src={require('../../assets/images/Learning-amico.png')} alt=""/>
            </Col>
            <Col>
              <h1 style={{fontSize: '48px', fontWeight: 'bold'}}>Mau Belajar Digital Marketing ?</h1>
              <p className='my-3' style={{fontSize: '24px'}}>Ayo mulai latih dirimu biar bisa bersaing di dunia kerja pada bidang yang kamu mau!</p>
              {/* <Button href='/login' className='py-2 px-4' style={{fontWeight: '500'}}>
                LOGIN
              </Button> */}
            </Col>
          </Row>
          <div className='text-center' style={{background: '#F4F4F5', padding: '3% 0'}}>
            <h1 className='mb-5'><b>DevCamp</b></h1>
            <CarouselComponent image={require('../../assets/images/image-1.png')} />
          </div>

          <h1 className='mx-auto text-center py-5' style={{width: '20%', fontSize: '48px', fontWeight: 'bold'}}>Pilihan Kelas di DevCamp</h1>
          <Row className='my-5 pb-5'>
            <Col className='text-center'>
              <img src={require('../../assets/images/Software integration-rafiki.png')} alt="" />
              <h4>Kelas Karyawan</h4>
            </Col>
            <Col className='text-center'>
              <img src={require('../../assets/images/Hand coding-amico.png')} alt="" />
              <h4>Kelas Profesional</h4>
            </Col>
            <Col className='text-center'>
              <img src={require('../../assets/images/Code typing-bro.png')} alt="" />
              <h4>Kelas Bisnis</h4>
            </Col>
          </Row>
      </div>
    <Footer />
    </>
  )
}

export default LandingPage