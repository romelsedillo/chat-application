import { Client, Databases } from "appwrite";
import {
  appwriteEndpoint,
  projectId,
  databaseId,
  userCollectionId,
  account,
} from "@/appwrite/appwrite";

// Function to fetch data from Appwrite
export const userCollection = async () => {
  try {
    const client = new Client()
      .setEndpoint(appwriteEndpoint)
      .setProject(projectId);
    const databases = new Databases(client);
    const user = await account.get();
    const userId = user.$id;

    const response = await databases.listDocuments(
      databaseId, // database id
      userCollectionId // userCollection id
    );

    const data = response.documents
      .filter((doc) => doc.$id !== userId)
      .map((doc) => ({
        id: doc.$id,
        name: doc.name,
        email: doc.email,
        status: doc.status,
      }));

    return data;
  } catch (error) {
    console.info("Error fetching users from AppWrite:", error);
    return [];
  }
};
