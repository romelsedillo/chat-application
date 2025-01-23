import { ID } from "appwrite";
import {
  databaseId,
  messagesCollectionId,
  databases,
} from "@/appwrite/appwrite";

/**
 * Add a new message to the messages collection.
 * @param {string} chatsId - The ID of the chat this message belongs to.
 * @param {string} senderId - The ID of the sender.
 * @param {string} inputMessage - The content of the message.
 */
export const addMessageFirstTime = async (
  randomId: string,
  senderId: string,
  inputMessage: string
): Promise<void> => {
  try {
    // Create a new document in the messages collection
    const response = await databases.createDocument(
      databaseId,
      messagesCollectionId,
      ID.unique(), // Generate a unique ID for the message
      {
        chats_id: randomId,
        sender_id: senderId,
        content: inputMessage.trim(), // Trim whitespace from the message
      }
    );
    console.log(randomId);
    console.log("First message added:", response);
  } catch (error) {
    console.error("Error adding first message:", error);
    throw error; // Re-throw the error if necessary
  }
};

export default addMessageFirstTime;
