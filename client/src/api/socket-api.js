import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

const onEvent = (eventName, cb) => {
  socket.on(eventName, cb);
};

const emitEvent = (eventName, data) => {
  socket.emit(eventName, data);
};

export { onEvent, emitEvent };
