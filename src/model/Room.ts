import mongoose, { Document } from 'mongoose';

const RoomSchema = new mongoose.Schema(
  {
    name: { type: String },
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    type: { type: String, enum: ['PRIVATE', 'GROUP'] },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);

RoomSchema.methods.toJSON = function () {
  return delete this.toObject().__v;
};

const Room = mongoose.model<Document>('Room', RoomSchema);

export default Room;