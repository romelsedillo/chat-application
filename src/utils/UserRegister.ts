import { account, ID } from "@/appwrite/appwrite";
import { toast } from "react-hot-toast";
import addUser from "./AddUser";

function generateRandomString(length = 20) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

// Generate a random string of length 20
const randomString = generateRandomString();

export const userRegister = async (
  email: string,
  password: string,
  name: string
) => {
  try {
    await account.create(ID.custom(randomString), email, password, name);
    await account.createEmailPasswordSession(email, password);
    await addUser(randomString, name, email);
    toast.success(
      "Registration successful! Please check your email to verify your account before logging in."
    );
  } catch (error: any) {
    // Handle specific error types from Appwrite
    switch (error?.type) {
      case "user_already_exists":
        toast.error(
          "An account with this email already exists. Please log in."
        );
        break;
      case "invalid_email":
        toast.error("The email address provided is invalid.");
        break;
      default:
        toast.error("An error occurred during registration. Please try again.");
        break;
    }
  }
};
