import { Client, Databases } from "appwrite";
import {
  appwriteEndpoint,
  projectId,
  databaseId,
  friendshipsCollectionId,
} from "@/appwrite/appwrite";

// Function to fetch data from Appwrite
export const friendshipsCollection = async () => {
  try {
    const client = new Client()
      .setEndpoint(appwriteEndpoint)
      .setProject(projectId);
    const databases = new Databases(client);

    // Fetch documents from the collection
    const response = await databases.listDocuments(
      databaseId, // database id
      friendshipsCollectionId //friendshipsCollectionId id
    );

    // Extract the data from the response and return it
    const data = response.documents.map((doc) => ({
      id: doc?.$id,
      username: doc?.users_id.username,
      status: doc?.status,
      // Add more fields as needed
    }));

    return data;
  } catch (error) {
    console.error("Error fetching data from friendships table:", error);
    return [];
  }
};
