import { Server, Socket } from 'socket.io';
import Message from '../../model/Message';
import { chatService } from './privateChat';

const SocketController = (IO: Server) => {
  IO.on('connection', (socket: Socket) => {
    console.log(socket.id, 'user connected');

    socket.on('join-room', (client) => {
      console.log(`client join-room`, client);
      socket.join(client.roomId);
    });

    // socket.on('chat', chatService);
    socket.on('chat', async (client) => {
      console.log(client, '@client message');
      const messageData = new Message({
        room: client.roomId,
        user: client.user,
        body: client.message,
      });
      const savedMessage = await messageData.save();
      console.log(savedMessage, '@savedMessage');
      socket
        .to(client.roomId)
        .emit('chat', { message: savedMessage.toObject() });
    });

    socket.on('test-endpoint', (client) => {
      // handle connection logic here
    });

    IO.sockets.emit('test-endpoint', {
      /** emit data to client */
    });
  });
};

export default SocketController;
