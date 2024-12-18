import { create } from "zustand";
import { account } from "@/appwrite/appwrite"; // Import your Appwrite account instance

// Define the types for the store
interface AuthState {
  loggedInUser: any;
  isLoggedIn: boolean;
  loading: boolean;
  checkUserSession: () => Promise<void>;
}

// Create the Zustand store
export const useAuthStore = create<AuthState>((set) => ({
  loggedInUser: null,
  isLoggedIn: false,
  loading: true, // Initial state is loading

  checkUserSession: async () => {
    set({ loading: true }); // Set loading to true when checking session
    try {
      const user = await account.get();
      set({
        loggedInUser: user,
        isLoggedIn: true,
      });
    } catch (error) {
      console.error("No active session found:", error);
      set({
        loggedInUser: null,
        isLoggedIn: false,
      });
    } finally {
      set({ loading: false }); // Loading is done
    }
  },
}));
