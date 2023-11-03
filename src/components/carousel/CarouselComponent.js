import React, { useEffect } from 'react'
import { Carousel, Container } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { getCarousel, getGambar } from '../../reducers/konten/carousel_reducer'

const CarouselComponent = () => {
  const dispatch = useDispatch()
  const { carousel } = useSelector(state => state.carousel)

  useEffect(() => {
    dispatch(getCarousel())
  }, [dispatch])

  return (
    // <div style={{background: '#F4F4F5', padding: '3% 0'}}>
    <Container style={{width: '60%'}}>
      <Carousel >
        {carousel.map((item, index) => (
          <Carousel.Item interval={1000} key={index}>
            <img
              className="d-block w-100"
              src={getGambar(item.gambar)}
              alt="First slide"
              style={{borderRadius: '30px'}}
              height={700}
              />
            <Carousel.Caption>
              <h3>{item.judul}</h3>
              <p>{item.deskripsi}</p>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </Container>
    // </div>
  )
}

export default CarouselComponent