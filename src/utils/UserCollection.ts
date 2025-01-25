import {
  databaseId,
  userCollectionId,
  account,
  databases,
} from "@/appwrite/appwrite";

// Function to fetch data from Appwrite
export const userCollection = async () => {
  try {
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
        profileUrl: doc.profileUrl,
      }));

    return data;
  } catch (error) {
    console.info("Error fetching users from AppWrite:", error);
    return [];
  }
};
