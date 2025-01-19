import { account } from "@/appwrite/appwrite";
import { databaseId, userCollectionId, databases } from "@/appwrite/appwrite";

export const UpdateProfile = async (profileUrl: string) => {
  const user = await account.get();

  try {
    const response = await databases.updateDocument(
      databaseId,
      userCollectionId,
      user.$id,
      {
        profileUrl: profileUrl,
      }
    );
  } catch (error) {
    console.error("Error updating profile:", error);
  }
};
