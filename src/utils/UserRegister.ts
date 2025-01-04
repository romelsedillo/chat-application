import { account, ID } from "@/appwrite/appwrite";
import { toast } from "react-hot-toast";

export const userRegister = async (
  email: string,
  password: string,
  name: string
) => {
  try {
    await account.create(ID.unique(), email, password, name);
    await account.createEmailPasswordSession(email, password);
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
