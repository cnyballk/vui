import { IMsgItem } from './types';

export const emitMsg = (socket:any, msg: IMsgItem) => {
  socket.emit("msg",msg);
};

/**
 * emitMsgs 发送消息组
 * @param socket theia-socket-io-client 实例
 * @param msgs 消息组
 * @param negation 是否取反
 * @param action 发送哪些类型的消息
 */
export const emitMsgs = (socket: any, msgs?: IMsgItem[]) => {
  msgs?.forEach((msg) => {
    emitMsg(socket, msg);
  });
};