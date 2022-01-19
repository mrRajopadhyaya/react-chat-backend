import Room from '../../model/Room';

export const createPrivateRoom = (currentUser, participant) => {
  const roomData = new Room({
    name: '',
    participants: [currentUser, participant],
    createdBy: currentUser,
    type: 'PRIVATE',
  });

  return roomData.save();
};
