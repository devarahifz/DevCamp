import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea } from '@mui/material';
import parse from 'html-react-parser'

const Overview = ({kelas, title, content, id}) => {
  return (
    <>
      <Card sx={{ maxHeight: 200, marginY: 2, borderRadius: 3, maxWidth: 345 }}>
        <Button href={`/peserta/materi/${id}`}>
          <CardActionArea>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {content.length > 150 ? parse("<p>" + content.substring(0,120) + "..." + "</p>") : parse("<p>" + content + "</p>")} 
              </Typography>
            </CardContent>
          </CardActionArea>
        </Button>
      </Card>
    </>
  )
}

export default Overview