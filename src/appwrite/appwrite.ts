import { Client, Account, Databases } from "appwrite";

export const appwriteEndpoint = process.env
  .NEXT_PUBLIC_APPWRITE_ENDPOINT as string;
export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID as string;
export const databaseId = process.env.NEXT_PUBLIC_DATABASE_ID as string;
export const userCollectionId = process.env.NEXT_PUBLIC_USER_COLLECTION_ID as string;
export const friendshipsCollectionId = process.env.NEXT_PUBLIC_FRIENDSHIPS_COLLECTION_ID as string;

export const client = new Client();

client.setEndpoint(appwriteEndpoint).setProject(projectId);

export const account = new Account(client);
export const databases = new Databases(client);
export { ID } from "appwrite";
export { OAuthProvider } from "appwrite";
export { Storage } from "appwrite";
