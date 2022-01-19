import Message from '../../model/Message';

export const chatService = async (client) => {
  try {
    const messageData = new Message({
      room: client.roomId,
      user: client.user,
      body: client.message,
    });
    const savedMessage = await messageData.save();
    // IO.sockets.emit('chat', { message: savedMessage.toObject() });
    // socket.emit('chat', { message: client.message });
  } catch (error) {
    console.log(error);
  }
};
