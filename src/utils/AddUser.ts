import { Client, Databases, ID } from "appwrite";
import {
  appwriteEndpoint,
  projectId,
  databaseId,
  userCollectionId,
} from "@/appwrite/appwrite";

export const addUser = async (randomString, name, email) => {
  try {
    const client = new Client()
      .setEndpoint(appwriteEndpoint)
      .setProject(projectId);
    const databases = new Databases(client);
    // Create a new document in the guests collection
    const response = await databases.createDocument(
      databaseId,
      userCollectionId,
      ID.custom(randomString),
      {
        name: name,
        email: email,
        status: "online",
        profileUrl: null,
      }
    );

    console.log("New User added:", response);
  } catch (error) {
    console.error("Error adding new User:", error);
  }
};
export default addUser;
