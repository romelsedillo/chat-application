import { create } from "zustand";
import { chatData } from "@/utils/chatData"; // Import chat data

interface ChatStore {
  chatData: any[];
  loading: boolean;
  error: string | null;
  loggedInUser?: any;
  userId?: string;
  userEmail?: string;
  checkUserSession: (router: any) => Promise<void>;
  fetchChatData: () => void;
}

const useChatStore = create<ChatStore>((set) => ({
  chatData: [],
  loading: false,
  error: null,

  checkUserSession: async (router: any) => {
    set({ loading: true });
    try {
      // Mock user session check (replace with actual authentication if needed)
      const user = {
        email: "user@example.com",
        userId: "123456",
      };
      set({ loggedInUser: user, userEmail: user.email, userId: user.userId });
    } catch (error) {
      console.log("No active session found, redirecting to login");
      router.push("/");
    } finally {
      set({ loading: false });
    }
  },

  fetchChatData: () => {
    set({ loading: true });
    try {
      set({ chatData, loading: false }); // Use imported chat data
    } catch (error: any) {
      console.error("Error fetching chat data:", error);
      set({ error: error.message, loading: false });
    }
  },
}));

export default useChatStore;
