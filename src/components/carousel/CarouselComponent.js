import React from 'react'
import { Carousel, Container } from 'react-bootstrap'

const CarouselComponent = (props) => {
  const { image } = props

  return (
    // <div style={{background: '#F4F4F5', padding: '3% 0'}}>
    <Container style={{width: '60%'}}>
      <Carousel >
        <Carousel.Item interval={1000}>
          <img
            className="d-block w-100"
            src={image}
            alt="First slide"
            style={{borderRadius: '30px'}}
            />
          <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={500}>
          <img
            className="d-block w-100"
            src={image}
            alt="Second slide"
            style={{borderRadius: '30px'}}
            />
          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={image}
            alt="Third slide"
            style={{borderRadius: '30px'}}
            />
          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </Container>
    // </div>
  )
}

export default CarouselComponent