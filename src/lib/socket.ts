import { io } from 'socket.io-client'

const socket = io('https://api.notiway.com.br')

export default socket
