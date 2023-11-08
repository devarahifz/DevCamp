import React, { useState } from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea } from '@mui/material';
import parse from 'html-react-parser'
import { Col, Row } from 'react-bootstrap';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const Overview = ({title, content, id, tugas, disable}) => {
  const handleDisable = () => {
    // if (tugas.length == 0) {
    //   return true
    // }
    // else {
    //   return false
    // }
  }
  return (
    <>
      <Card sx={{ maxHeight: 200, marginY: 2, borderRadius: 3 }}>
          {/* <CardActionArea href={`/peserta/materi/${id}`}> */}
            <CardContent>
              <Row>
                <Col className='my-auto'>
                  <Typography gutterBottom variant="h5" component="div">
                    {title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{textAlign: 'justify'}}>
                    {content.length > 150 ? parse("<p>" + content.substring(0,320) + "..." + "</p>") : parse("<p>" + content + "</p>")} 
                  </Typography>
                </Col>
                <Col xs={2} className="text-end my-auto">
                  <Button href={`/peserta/materi/${id}`} variant="contained" style={{backgroundColor: disable ? 'grey' : '#3f51b5' , color: 'white', marginTop: 10}} disabled={disable}>
                    Lihat Materi
                  </Button>
                </Col>
                <Col xs={2} className='text-center my-auto'>
                  {
                    tugas.length == 0 ?
                    <CheckCircleIcon sx={{color: 'white', fontSize: 40, marginTop: 0, border: '1px solid #96be25', borderRadius: 100}} />
                    :
                    (() => {
                      // setIsMateriAssigned(true);
                      // setIsPrevMateriAssigned(true);
                      return <CheckCircleIcon sx={{color: '#96be25', fontSize: 40, marginTop: 0, border: '1px solid #96be25', borderRadius: 100}} />
                    })()
                  }
                </Col>
              </Row>
            </CardContent>
          {/* </CardActionArea> */}
      </Card>
    </>
  )
}

export default Overview