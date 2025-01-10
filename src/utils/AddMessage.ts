import { Client, Databases, ID } from "appwrite";
import {
  appwriteEndpoint,
  projectId,
  databaseId,
  messagesCollectionId,
} from "@/appwrite/appwrite";

/**
 * Add a new message to the messages collection.
 * @param {string} chatsId - The ID of the chat this message belongs to.
 * @param {string} senderId - The ID of the sender.
 * @param {string} inputMessage - The content of the message.
 */
export const addMessage = async (
  chatsId: string,
  senderId: string,
  inputMessage: string
): Promise<void> => {
  try {
    // Initialize Appwrite client and database
    const client = new Client()
      .setEndpoint(appwriteEndpoint)
      .setProject(projectId);

    const databases = new Databases(client);

    // Validate input
    if (!chatsId || !senderId || !inputMessage.trim()) {
      throw new Error("Invalid input: Chats ID, Sender ID, and Message are required.");
    }

    // Create a new document in the messages collection
    const response = await databases.createDocument(
      databaseId,
      messagesCollectionId,
      ID.unique(), // Generate a unique ID for the message
      {
        chats_id: chatsId,
        sender_id: senderId,
        content: inputMessage.trim(), // Trim whitespace from the message
      }
    );

  } catch (error) {
    console.error("Error adding new message:", error);
    throw error; // Re-throw the error if necessary
  }
};

export default addMessage;
