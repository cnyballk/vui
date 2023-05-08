import { Socket } from 'socket.io-client';
import { IMsgItem } from './types';

export const emitMsg = (socket:any, msg: IMsgItem) => {
  socket.emit("msg",msg);
};

/**
 * emitMsgs 发送消息组
 * @param socket socket-io-client 实例
 * @param msgs 消息组
 */
export const emitMsgs = (socket: Socket, msgs?: IMsgItem[]) => {
  msgs?.forEach((msg) => {
    emitMsg(socket, msg);
  });
};
