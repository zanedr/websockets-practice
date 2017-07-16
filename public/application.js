var socket = io();
const submitButton = document.getElementById('submit')
const userName = document.getElementById('user-name')
const dialogue = document.getElementById('dialogue')

socket.on('connect', () => {
  console.log('connected again yo');

  socket.send({
    welcome: 'You have entered the chat.'
  })
});

submitButton.addEventListener('click', () => {
  socket.send({
    user: userName.value, text: dialogue.value
  })
})

socket.on('message', (message) => {
  if(typeof message === 'string') {
    $('.messages').append(`<p>${message}</p>`)
  }
})
