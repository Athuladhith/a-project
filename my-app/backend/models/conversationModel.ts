import { Schema, model, Document, Types } from 'mongoose';

// Define an interface for the Message subdocument
interface IMessage {
  sender: string;
  content: string;
  timestamp: Date;
}

// Define an interface for Conversation Document
interface IConversation extends Document {
  restaurantId: Types.ObjectId;
  userId: Types.ObjectId;
  messages: IMessage[];
  createdAt: Date;
}

// Define the schema for messages
const messageSchema = new Schema<IMessage>({
  sender: { type: String, required: true },
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

// Define the schema with types
const conversationSchema = new Schema<IConversation>({
  restaurantId: { type: Schema.Types.ObjectId, ref: 'Restaurant', required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  messages: [messageSchema], // Embed the message schema as an array of subdocuments
  createdAt: { type: Date, default: Date.now },
});

// Create the model from the schema
const Conversation = model<IConversation>('Conversation', conversationSchema);

export default Conversation;
