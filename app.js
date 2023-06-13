const socket = io('http://localhost:8000');

const messagecontainer = document.getElementById('messagecontainer');
const text = document.getElementById('text');
const form = document.getElementById('sendcontainer');

const name = prompt("what's your name");
console.log(name);

const append = (message,position)=>{
    const messageelem = document.createElement('div');
    messageelem.innerText = message;
    messageelem.classList.add(position);
    messagecontainer.append(messageelem);
}

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const message = text.value;
    console.log(message);
    append(`You: ${message}`,'right');
    socket.emit('send',message);
    text.value ='';
})

socket.emit('new-user-joined',name);
socket.on('user-joined',name=>{
   append(`${name} Joined the chat`,'left');
})

socket.on('recived',data=>{
    append(`${data.name}: ${data.message}`,'left');
})