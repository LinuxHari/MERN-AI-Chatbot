import { Router } from "express";
import { chatCompletionValidator, validate } from "../utils/validator.js";
import { verifyToken } from "../utils/tokenManager.js";
import { deleteChats, generateChatCompletion, sendChatsToUser } from "../controllers/chatControllers.js";
const chatRoutes = Router();
chatRoutes.post("/new", validate(chatCompletionValidator), verifyToken, generateChatCompletion);
chatRoutes.get("/all-chats", verifyToken, sendChatsToUser);
chatRoutes.get("/delete", verifyToken, deleteChats);
export default chatRoutes;
//# sourceMappingURL=chatRoutes.js.map