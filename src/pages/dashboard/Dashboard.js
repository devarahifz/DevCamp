import React, { useEffect} from 'react'
import { Button, Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material'
import { Row, Col } from 'react-bootstrap'
import { fetchKelas, getAssetURL } from '../../reducers/kelas_reducer'
import { useDispatch, useSelector } from 'react-redux'
import parse from 'html-react-parser'

const Dashboard = () => {
  const dispatch = useDispatch()
  const { kelas } = useSelector((state) => state.kelas)
  const { user } = useSelector((state) => state.user)
  const idUser = localStorage.getItem("idUser")

  useEffect(() => {
    dispatch(fetchKelas())
  }, [])
  
  return (
    <> 
      <h4>Hello, {user.nama_lengkap} !</h4>
      <Row>
        {kelas.map((kelas, index) => (
        <Col xs={4} key={index}>
          <Card sx={{ maxWidth: 480, margin: '1rem', borderRadius: 3 }} >
            {/* <CardActionArea href={`/peserta/kelas/${kelas.nama_kelas}`} disabled={!(kelas.peserta.includes(parseInt(idUser))) }> */}
              <CardActionArea href={`/peserta/kelas/${kelas.nama_kelas}`} disabled={!(kelas.peserta.includes(idUser)) }>
                <CardMedia
                  component="img"
                  height="80%"
                  image={getAssetURL(kelas.cover)}
                  alt={kelas.nama_kelas}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {kelas.nama_kelas}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{textAlign: 'justify'}}>
                  {kelas.deskripsi?.length > 150
                  ? parse("<p>" + kelas.deskripsi.substring(0,300) + "..." + "</p>")
                  : parse("<p>" + kelas.deskripsi + "</p>")
                  }
                  </Typography>
                </CardContent>
              </CardActionArea>
            {/* </Button> */}
          </Card>
        </Col>
        ))}
      </Row>
    </>
  )
}

export default Dashboard