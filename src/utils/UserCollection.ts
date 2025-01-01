import { Client, Databases } from "appwrite";
import {
  appwriteEndpoint,
  projectId,
  databaseId,
  userCollectionId,
} from "@/appwrite/appwrite";

// Function to fetch data from Appwrite
export const userCollection = async () => {
  try {
    const client = new Client()
      .setEndpoint(appwriteEndpoint)
      .setProject(projectId);
    const databases = new Databases(client);

    // Fetch documents from the collection
    const response = await databases.listDocuments(
      databaseId, // database id
      userCollectionId //userCollection id
    );

    // Extract the data from the response and return it
    const data = response.documents.map((doc) => ({
      id: doc.$id,
      name: doc.username,
      email: doc.email,
      status: doc.status,
      created_at: doc.created_at,
      // Add more fields as needed
    }));

    return data;
  } catch (error) {
    console.error("Error fetching data from AppWrite:", error);
    return [];
  }
};
