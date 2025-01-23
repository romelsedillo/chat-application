import { account } from "@/appwrite/appwrite";
import { databaseId, chatsCollectionId, databases } from "@/appwrite/appwrite";

export const UpdateChat = async (ChatId: string, messageContent: string) => {
  const user = await account.get();

  try {
    const response = await databases.updateDocument(
      databaseId,
      chatsCollectionId,
      ChatId,
      {
        last_message: messageContent,
      }
    );
    console.log("chat updated", response);
  } catch (error) {
    console.error("Error updating chat:", error);
  }
};
