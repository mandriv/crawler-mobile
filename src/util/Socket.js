import SocketIOClient from 'socket.io-client';
import { API_HOST } from 'react-native-dotenv';

export const SOC_JOIN = 'user-join';
export const SOC_JOIN_FAIL = 'user-join-fail';
export const SOC_REQUEST_ROOMS = 'request-room-list';
export const SOC_REQUEST_ROOMS_FAIL = 'request-room-fail';
export const SOC_ROOMS_LIST = 'room-list';
export const SOC_CONTROLS = 'robot-control';
export const SOC_JOIN_ROOM = 'user-join-room';
export const SOC_JOIN_ROOM_FAIL = 'user-join-room-fail';
export const SOC_ROOMS_LIST_UPDATE = 'room-list-update';

export default class Socket {

  socket = null;

  constructor() {
    this.socket = SocketIOClient(API_HOST, {
      transports: ['websocket'],
    });
  }

  subscribeTo = (action, callback) => {
    this.socket.on(action, data => callback(data));
  }

  emit = action => this.socket.emit(action);

  emitData = (action, data) => this.socket.emit(action, data);

}
