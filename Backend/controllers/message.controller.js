import Conversation from '../models/conversation.model.js';
import Message from '../models/message.model.js';
import { io, getReceiverSocketId } from '../SocketIO/server.js';

export const sendMessage = async(req, res) => {
    try {
        const { message } = req.body;
        const { id: receiverId } = req.params;
        console.log("Sender:", req.user);

        const senderId = req.user._id;

        let conversation = await Conversation.findOne({
            members: { $all: [senderId, receiverId] },
        });

        if (!conversation) {
            conversation = await Conversation.create({
                members: [senderId, receiverId],
            });
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            message,
        });

        if (newMessage) {
            conversation.messages.push(newMessage._id);
        }

        await Promise.all([conversation.save(), newMessage.save()]);

        const receiverSocketId = getReceiverSocketId(receiverId);
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", newMessage);
            console.log(`Emitted newMessage to receiver ${receiverId} at socket ID ${receiverSocketId}`);
        } else {
            console.log(`Receiver ${receiverId} is not online (no socket ID found).`);
        }

        res.status(200).json({
            message: "Message sent successfully",
            data: newMessage,
        });
    } catch (error) {
        console.log("Error in sendMessage", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const getMessage = async(req, res) => {
    try {
        const { id: chatUser } = req.params;
        const senderId = req.user._id;
        let conversation = await Conversation.findOne({
            members: { $all: [senderId, chatUser] },
        }).populate("messages");

        if (!conversation) {
            return res.status(200).json([]);
        }
        const messages = conversation.messages;
        res.status(200).json(messages);
    } catch (error) {
        console.log("Error in getMessage", error);
        res.status(500).json({ error: "Internal server error" });
    }
};