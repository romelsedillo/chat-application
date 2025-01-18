import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { userCollection } from "@/utils/UserCollection";
import { PlusIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";

interface User {
  id: string;
  name: string;
  email: string;
}

export function AddChatMate({ onChatMateClick }) {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showRecommended, setShowRecommended] = useState(false);

  const fetchDataUser = async () => {
    setLoading(true);
    try {
      const appWriteData = await userCollection();
      setUsers(appWriteData);
    } catch (err) {
      setError("Failed to load users. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDataUser();
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const query = searchQuery.toLowerCase().trim();
      setFilteredUsers(
        users.filter(
          (user) =>
            user.name?.toLowerCase().includes(query) ||
            user.email?.toLowerCase().includes(query)
        )
      );
      setShowRecommended(query.length > 0);
    }, 300);

    return () => clearTimeout(timeout);
  }, [searchQuery, users]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="bg-slate-200 w-8 h-8 flex items-center justify-center rounded">
          <PlusIcon />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] rounded-sm">
        <DialogHeader>
          <DialogTitle>Search new friends</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col w-full py-4 items-center">
          <input
            placeholder="Search by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-[500px] py-3 px-3 border border-slate-700 outline-none rounded mb-4"
          />
          {loading && <p>Loading users...</p>}
          {error && <p className="text-red-500">{error}</p>}
          {showRecommended && !loading && !error && (
            <ul className="w-[500px] flex flex-col gap-3">
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <li
                    key={user.id}
                    className="flex items-center justify-between bg-slate-100 px-4 py-2 rounded shadow"
                  >
                    <div>
                      <p className="text-sm font-medium">{user.name}</p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                    <button
                      className="text-blue-500 hover:text-blue-700"
                      onClick={() => onChatMateClick(user)}
                    >
                      Chat
                    </button>
                  </li>
                ))
              ) : (
                <p className="text-gray-500">No users found.</p>
              )}
            </ul>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
