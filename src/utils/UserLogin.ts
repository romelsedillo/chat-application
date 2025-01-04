import { account } from "@/appwrite/appwrite";
import { toast } from "react-hot-toast";

export const userLogin = async (email: string, password: string) => {
  try {
    await account.createEmailPasswordSession(email, password);
    const user = await account.get();
    console.log("Logged in user:", user);
    toast.success("Login successful! Welcome back.");
    window.location.reload();
  } catch (error: any) {
    switch (error?.type) {
      case "user_not_found":
        toast.error("No account found with this email. Please register.");
        break;
      case "invalid_credentials":
        toast.error("Incorrect email or password. Please try again.");
        break;
      default:
        toast.error("An error occurred during login. Please try again.");
        console.error("Login error:", error);
        break;
    }
  }
};
