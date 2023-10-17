import React, { useState, useRef, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Card, Form } from 'react-bootstrap'
import { getFoto } from '../../reducers/user_reducer'
import { Avatar, Button } from '@mui/material'
const url = 'wss://devcamp.duckdns.org/websocket'

const ForumDiscussion = () => {
	const [newMessage, setNewMessage] = useState('');
	const [messageHistory, setMessageHistory] = useState([]);
  const { user } = useSelector((state) => state.user)

	const connectionRef = useRef(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    connectionRef.current = new WebSocket(url);
    connectionRef.current.addEventListener('open', function () {
      authenticate();
    })
    connectionRef.current.addEventListener('message', (message) => receiveMessage(message));

    intervalRef.current = setInterval(() => {
      connectionRef.current.send(JSON.stringify({ type: 'ping' }));
    }, 30000); // Sends a ping every 30 seconds

    return () => {
      clearInterval(intervalRef.current);
    };
  }, [])

	const authenticate = () => {
		const access_token = 'Y7N8ffGfFq9eLf1UvHUxVToKMfd4cqj1'
		connectionRef.current.send(JSON.stringify({ type: 'auth', access_token }));
	};
  
	const receiveMessage = (message) => {
		const data = JSON.parse(message.data);

		if (data.type == 'auth' && data.status == 'ok') {
			connectionRef.current.send(
				JSON.stringify({
					type: 'subscribe',
					collection: 'forum_diskusi',
					query: {
						fields: [
              '*',
              'peserta.id', 
              'peserta.nama_lengkap', 
              'peserta.foto',
              'kelas.id', 
              'kelas.nama_kelas',
            ],
						filter: {
              kelas: {
                _eq: user.kelas?.id
              }
            },
            sort: 'date_created',
					},
				})
			);
		}

		if (data.type === 'subscription' && data.event === 'init') {
			for (const message of data.data) {
				setMessageHistory((history) => [...history, message]);
			}
		}

		if (data.type === 'subscription' && data.event === 'create') {
			setMessageHistory((history) => [...history, data.data[0]]);
		}
	};

	const messageSubmit = (event) => {
		event.preventDefault();

		connectionRef.current.send(
			JSON.stringify({
				type: 'items',
				collection: 'forum_diskusi',
				action: 'create',
				data: { 
          text: newMessage,
          peserta: user.id,
          kelas: user.kelas,
        },
			})
		);
    
		setNewMessage('');
	};

	const handleMessageChange = (event) => {
		setNewMessage(event.target.value);
	};

  const style = {
    card: {
      backgroundColor: 'white',
      borderRadius: 10,
      padding: '1rem 2rem',
      margin: '0 0 1rem 0',
      height: 'auto',
    },
  }

  return (
    <div className='row'>
      <div className='col'>

      <div style={style.card}>
        <h3 style={{margin: 0, fontWeight: '600'}}>Forum Diskusi Kelas {user.kelas?.nama_kelas}</h3>
      </div>
      <div style={style.card}>
        <div style={{display: 'flex', flexDirection: 'column'}}>
          {
          messageHistory.length == 0 ?
          <h3 style={{margin: '10rem 0', textAlign: 'center'}}>Belum ada diskusi</h3>
          :
          messageHistory.map((message) => (
            <Card
            key={message.id}
            text='dark'
            style={{ 
              minWidth: '18rem', 
              margin: '0.5rem 0',
              alignSelf: message.peserta.id == user.id ? 'flex-end' : 'flex-start', 
              backgroundColor: message.peserta.id == user.id ? '#BAFFC1' : '#BAE7FF' 
            }}
            className="mb-2"
            >
              <Card.Body className='pb-0'>
                <div className='d-flex'>
                  <Avatar src={getFoto(message.peserta.foto)} sx={{ width: 32, height: 32, mr: 2 }} />
                  <div>
                    <Card.Title style={{fontWeight: '700', margin: 0}}>{message.peserta.nama_lengkap}</Card.Title>
                    <small className='text-muted'>
                      {new Date(message.date_created).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    </small>
                  </div>
                </div>
                <Card.Text className='mt-3 mb-0'>{message.text}</Card.Text>
                <Card.Text className="text-muted text-end">
                  <small>
                    {new Date(message.date_created).toLocaleTimeString('id-ID', { hour12: false, hour: 'numeric', minute: 'numeric' })}
                  </small>
                </Card.Text>
              </Card.Body>
            </Card>
          ))}
        </div>

      </div>
      <div style={style.card}>
        <Form onSubmit={messageSubmit} className='d-flex mt-3 mb-3'>
          <Form.Control type="text" id="message" name="message" placeholder='Ketik pesan' value={newMessage} onChange={handleMessageChange} style={{backgroundColor: '#EEF2F6'}} />
          <Button type="submit" variant='contained' sx={{ml: 2, width: '100px', backgroundColor: '#3F51B5'}}>KIRIM</Button>
        </Form>
      </div>
      </div>
    </div>
  )
}

export default ForumDiscussion