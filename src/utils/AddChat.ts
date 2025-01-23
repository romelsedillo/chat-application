import { ID } from "appwrite";
import { account } from "@/appwrite/appwrite";

import { databaseId, chatsCollectionId, databases } from "@/appwrite/appwrite";

export const addChat = async (randomId, chatMateId, messageContent) => {
  try {
    const user = await account.get();
    // Create a new document in the guests collection
    const response = await databases.createDocument(
      databaseId,
      chatsCollectionId,
      ID.custom(randomId),
      {
        users1_id: user.$id,
        users2_id: chatMateId,
        last_message: messageContent,
      }
    );

    console.log("New chat added:", response);
  } catch (error) {
    console.error("Error adding new chat:", error);
  }
};
export default addChat;
