"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

export default function LogoutButton() {
  const router = useRouter();

  function handleLogout() {
    // 1. Delete the cookie by setting max-age to 0
    document.cookie = "admin_token=; path=/; max-age=0";
    
    // 2. Redirect to Login
    router.push("/login");
    router.refresh();
  }

  return (
    <button 
      onClick={handleLogout} 
      className="flex items-center gap-2 text-red-600 hover:bg-red-50 px-3 py-2 rounded-md transition text-sm font-medium"
    >
      <LogOut size={16} />
      Logout
    </button>
  );
}
