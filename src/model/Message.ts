import mongoose, { Document } from 'mongoose';

const MessageSchema = new mongoose.Schema(
  {
    room: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    body: { type: String, required: true },
    seen: { type: Boolean, required: true, default: false },
  },
  { timestamps: true }
);

MessageSchema.methods.toJSON = function () {
  return delete this.toObject().__v;
};

const Message = mongoose.model<Document>('Message', MessageSchema);

export default Message;
