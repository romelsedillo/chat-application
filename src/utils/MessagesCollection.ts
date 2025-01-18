import { Client, Databases } from "appwrite";
import {
  appwriteEndpoint,
  projectId,
  databaseId,
  messagesCollectionId,
  account,
} from "@/appwrite/appwrite";

// Function to fetch data from Appwrite
export const messagesCollection = async () => {
  try {
    const client = new Client()
      .setEndpoint(appwriteEndpoint)
      .setProject(projectId);
    const databases = new Databases(client);
    const user = await account.get();
    const userId = user.$id;

    const response = await databases.listDocuments(
      databaseId, // database id
      messagesCollectionId // userCollection id
    );

    const data = response.documents.map((doc) => ({
      id: doc.$id,
      chatsId: doc.chats_id?.$id,
      senderId: doc.sender_id?.$id,
      content: doc.content,
      createdAt: doc.$createdAt,
      updatedAt: doc.$updatedAt,
    }));
    return data;
  } catch (error) {
    console.info("Error fetching messages from AppWrite:", error);
    return [];
  }
};
