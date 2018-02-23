import SocketIOClient from 'socket.io-client';
import { API_HOST } from 'react-native-dotenv';

export default class Socket {

  socket = null;

  constructor() {
    this.socket = SocketIOClient(API_HOST, {
      transports: ['websocket'],
    });
  }

  subscribeToMessages = (callback) => {
    this.socket.on('message', message => callback(null, message));
  }

  sendControls = (controls) => {
    console.log(controls);
    this.socket.emit('robot-control', controls);
  }

}
