import { Request, Response } from 'express';
import Message from '../../model/Message';
import Room from '../../model/Room';
import { handleError, handleSuccess } from '../../utils/handleResponse';
import { createPrivateRoom } from './services';

export const privateRoom = async (request: Request, response: Response) => {
  const {
    currentUser,
    body: { selectedUser },
  } = request as any;
  try {
    const room = await Room.findOne({
      participants: { $all: [currentUser._id, selectedUser] },
      type: 'PRIVATE',
    })
      .populate('participants')
      .lean();

    if (!room || !Object.keys(room).length) {
      const createdRoom = await createPrivateRoom(
        currentUser._id,
        selectedUser
      );
      return handleSuccess(response, { messages: [], room: createdRoom });
    } else {
      const messageDoc = await Message.find({ room: room._id }).lean();
      return handleSuccess(response, { messages: { ...messageDoc }, room });
    }
  } catch (error) {
    return handleError(response, error);
  }
};

export const createGroupRoom = async (request: Request, response: Response) => {
  return handleSuccess(response, {});
};

export const getMessageHistory = async (
  request: Request,
  response: Response
) => {
  const {
    params: { roomId },
  } = request as any;
  try {
    const messages = await Message.find({ room: roomId })
      .populate('user')
      .lean();
    return handleSuccess(response, { messages });
  } catch (error) {
    return handleError(response, error);
  }
};

export const getAllRooms = async (request: Request, response: Response) => {
  try {
    const { currentUser } = request as any;
    const rooms = await Room.find({
      participants: { $all: [currentUser._id] },
      type: 'PRIVATE',
    })
      .populate('participants')
      .lean();
    console.log(`rooms`, rooms);
    return handleSuccess(response, { rooms });
  } catch (error) {
    return handleError(response, error);
  }
};
