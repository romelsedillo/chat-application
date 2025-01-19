import { create } from "zustand";
import { account } from "@/appwrite/appwrite";

// Define the types for the store
interface AuthState {
  loggedInUser: any;
  isLoggedIn: boolean;
  loading: boolean;
  error: string | null; // Store error messages
  checkUserSession: () => Promise<void>;
}

// Create the Zustand store
export const useAuthStore = create<AuthState>((set) => ({
  loggedInUser: null,
  isLoggedIn: false,
  loading: true,
  error: null,

  checkUserSession: async () => {
    set({ loading: true, error: null });
    try {
      const user = await account.get();
      
      set({
        loggedInUser: user,
        isLoggedIn: true,
      });
    } catch (error: any) {
      if (error.code === 401) {
        // 401 Unauthorized: No active session
        console.info("No active session found.");
      } else {
        console.error("Unexpected error:", error);
      }
      set({
        loggedInUser: null,
        isLoggedIn: false,
        error: error?.message || "Unknown error occurred.",
      });
    } finally {
      set({ loading: false });
    }
  },
}));
