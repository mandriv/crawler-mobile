import { SOC_CONTROLS } from './Socket';


export default class ControlStateEmitter {

  INTERVAL_PERIOD = 50; // ms

  constructor(socket) {
    this.socket = socket;
    this.data = {
      power: 0,
      angle: 0,
    };
    this.clock = null;
  }

  startEmitting = () => {
    this.clock = setInterval(this.emitData, this.INTERVAL_PERIOD);
  }

  stopEmitting = () => clearInterval(this.clock);

  emitData = () => this.socket.emitData(SOC_CONTROLS, this.data);

  handleDataChange = (newData) => {
    this.data = newData;
  }

}
