import { Client, Databases } from "appwrite";
import {
  appwriteEndpoint,
  projectId,
  databaseId,
  chatsCollectionId,
  account,
} from "@/appwrite/appwrite";

// Function to fetch data from Appwrite
export const chatsCollection = async () => {
  try {
    const client = new Client()
      .setEndpoint(appwriteEndpoint)
      .setProject(projectId);
    const databases = new Databases(client);
    const user = await account.get();
    const loggedInUserId = user.$id; // user who currently logged in

    const response = await databases.listDocuments(
      databaseId, // database id
      chatsCollectionId // userCollection id
    );
    // .filter((doc) => doc.$users2_id === userId)
    const data = response.documents
      .filter(
        (doc) => doc.users1_id.$id || doc.users2_id.$id === loggedInUserId
        //   doc.users1_id.$id === loggedInUserId ||
        //   doc.users2_id.$id === loggedInUserId
      )
      .map((doc) => ({
        id: doc.$id,
        user1: doc.users1_id,
        user2: doc.users2_id,
        lastMessage: doc.last_message,
        lastMessageTime: doc.last_message_time,
      }));
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching data from AppWrite:", error);
    return [];
  }
};
