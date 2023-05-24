import React from 'react'
import NavbarLanding from '../../components/header/NavbarLanding'
import Footer from '../../components/footer/FooterComponent'
import "./style.css"
import { Button, Row, Col, Container } from 'react-bootstrap'

const LandingPage = () => {
  return (
    <>
    <NavbarLanding />
      <div className='mx-auto' style={{minHeight: '100vh'}}>
        <div className="background position-relative" >
          <div className='mx-5 px-5 position-absolute' style={{color: 'white', marginTop: '5%'}}>
              <h1 className='text-center mx-auto' style={{fontSize:'36px', width: '35%'}}>Persiapkan Dirimu Demi Meraih Pekerjaan Impianmu !</h1>
              <p className='text-center mx-auto my-5' style={{fontSize:'24px', width: '60%'}}>DevCamp hadir disini untuk Anda yang ingin meraih pekerjaan impian pada bidang IT. DevCamp hadir dengan kelas-kelas yang akan membantu Anda dalam mempelajari bidang IT seperti, Full-Stack Developer, Frontend Developer, maupun Backend Developer.</p>
          </div>
        </div>
          <Row className='align-items-center my-5 py-5' style={{margin: '0 10%'}}>
            <Col className='text-center'>
              <img src={require('../../assets/images/Learning-amico.png')} alt=""/>
            </Col>
            <Col>
              <h1 style={{fontSize: '48px', fontWeight: 'bold'}}>Belum Punya Skill di Bidang IT ?</h1>
              <p className='my-3' style={{fontSize: '24px'}}>Ayo mulai latih dirimu biar bisa bersaing di bidang yang kamu mau!</p>
              <Button className='py-2 px-4' style={{fontWeight: '500'}}>
                LOGIN
              </Button>
            </Col>
          </Row>
          <h1 className='mx-auto text-center py-5' style={{width: '20%', fontSize: '48px', fontWeight: 'bold'}}>Pilihan Kelas di DevCamp</h1>
          <Row className='my-5 pb-5'>
            <Col className='text-center'>
              <img src={require('../../assets/images/Software integration-rafiki.png')} alt="" />
              <h4>Full-Stack Developer</h4>
            </Col>
            <Col className='text-center'>
              <img src={require('../../assets/images/Hand coding-amico.png')} alt="" />
              <h4>Frontend Developer</h4>
            </Col>
            <Col className='text-center'>
              <img src={require('../../assets/images/Code typing-bro.png')} alt="" />
              <h4>Backend Developer</h4>
            </Col>
          </Row>
      </div>
    <Footer />
    </>
  )
}

export default LandingPage