import { Client, Databases } from "appwrite";
import {
  appwriteEndpoint,
  projectId,
  databaseId,
  chatsCollectionId,
  userCollectionId, // Add this for the users collection ID
  account,
} from "@/appwrite/appwrite";

// Function to fetch user details by ID
const getUserById = async (userId: string) => {
  try {
    const client = new Client()
      .setEndpoint(appwriteEndpoint)
      .setProject(projectId);
    const databases = new Databases(client);

    const response = await databases.getDocument(
      databaseId, // Your database ID
      userCollectionId, // Your users collection ID
      userId // User ID to fetch
    );

    return response;
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    return null;
  }
};

// Function to fetch chats for the logged-in user
export const chatsCollection = async () => {
  try {
    // Initialize the Appwrite client
    const client = new Client()
      .setEndpoint(appwriteEndpoint)
      .setProject(projectId);
    const databases = new Databases(client);

    // Get logged-in user's details
    const user = await account.get();
    const loggedInUserId = user.$id; // Current user's ID

    // Fetch all chat documents
    const response = await databases.listDocuments(
      databaseId, // Your database ID
      chatsCollectionId // Your chats collection ID
    );

    // Filter chats where the logged-in user is a participant
    const chats = response.documents.filter(
      (doc) =>
        doc.users1_id.$id === loggedInUserId ||
        doc.users2_id.$id === loggedInUserId
    );

    // Map data to include other participant's name
    const data = await Promise.all(
      chats.map(async (doc) => {
        // Determine the other participant's ID
        const otherUserId =
          doc.users1_id.$id === loggedInUserId
            ? doc.users2_id.$id
            : doc.users1_id.$id;

        // Fetch the other participant's details
        const otherUser = await getUserById(otherUserId);

        return {
          id: doc.$id,
          otherParticipantId: otherUser?.$id || otherUserId,
          otherParticipantName: otherUser?.name || "Unknown User", // Replace with actual attribute name
          lastMessage: doc.last_message,
          lastMessageTime: doc.last_message_time,
          profileUrl: otherUser?.profileUrl,
          status: otherUser?.status,
        };
      })
    );

    return data;
  } catch (error) {
    console.error("Error fetching chats for logged-in user:", error);
    return [];
  }
};
