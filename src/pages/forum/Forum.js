import React from 'react'
import { useSelector } from 'react-redux'
// import { url } from '../../configs/public_url'

const ForumDiscussion = () => {
  const url = 'ws://143.198.90.40:8055/websocket'
  // const access_token = "RkNFTIsPpbmnPFNjlW6FN7ng1xmA3zFh"
  const access_token = "kP9eNLfLSyHAhWQ4ZzRDZZ6-yLicmTmO"
  const connection = new WebSocket(url) 
  const { user } = useSelector((state) => state.user)
  const { kelas } = useSelector((state) => state.kelas)

  connection.addEventListener('open', function () {
    console.log({ event: 'onopen' });
    connection.send(
      JSON.stringify({
        type: 'auth',
        access_token,
      })
    );
  });

  connection.addEventListener('message', function (message) {
    recieveMessage(message)
  });

  const onSubmit = (e) => {
    e.preventDefault();
    const text = document.getElementById('text').value;
    connection.send(
      JSON.stringify({
        type: 'items',
        collection: 'forum_diskusi',
        action: 'create',
        data: {
          text,
          peserta: user.id,
          kelas: user.kelas,
        },
      })
    );
    document.getElementById('text').value = '';
  }

  function recieveMessage(message) {
    const data = JSON.parse(message.data);
    console.log({ event: 'onmessage', data });

    if (data.type == 'auth' && data.status == 'ok') {
      connection.send(
        JSON.stringify({
          type: 'subscribe',
          collection: 'forum_diskusi',
          query: {
            fields: [
              '*',
              'peserta.nama_lengkap',
              'kelas.id',
              'kelas.nama_kelas'
            ],
            filter: {
              kelas: {
                _eq: user.kelas
              }
            },
            sort: 'date_created'
          },
        })
      );
    }

    if (data.type == 'subscription' && data.event == 'init') {
      console.log('subscription started')
      console.log(data.data)
      for (const message of data.data) {
          addMessageToList(message);
      }
    }

    if (data.type == 'subscription' && data.event == 'created') {
      addMessageToList(data.data[0]);
    }
  }

  function addMessageToList(message) {
    const li = document.createElement('li');
    li.setAttribute('id', message.id);
    li.textContent = `${message.peserta.nama_lengkap}: ${message.text}`;
    document.querySelector('ol').appendChild(li);
  }

  return (
    <>
      <ol></ol>
      <form id="new" onSubmit={onSubmit}>
        <label for="message">Message</label>
        <input type="text" id='text' />
        <input type="submit" />
      </form>
    </>
  )
}

export default ForumDiscussion