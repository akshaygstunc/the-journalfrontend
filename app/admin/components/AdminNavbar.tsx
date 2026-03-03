"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiSearch, FiUser, FiLogOut } from "react-icons/fi";

export default function AdminNavbar() {
  const pathname = usePathname();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header className="h-17.5 bg-[#F5F5F5] flex items-center justify-between px-6 border-b border-[#E5E5E5]">
      {/* Logo - matches sidebar */}
      <div className="flex items-center gap-2">
        <div className="h-8 w-8 rounded-full bg-[#861212] flex items-center justify-center">
          <span className="text-white text-[12px] font-semibold leading-none">
            L
          </span>
        </div>
        <span className="text-[16px] font-semibold text-[#212121]">
          Logoipsum
        </span>
      </div>

      {/* Search */}
      <div className="flex-1 max-w-md mx-8 relative">
        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6D6D6D] w-4 h-4 pointer-events-none" />
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#E5E5E5] rounded-lg text-[14px] text-[#212121] focus:outline-none focus:ring-2 focus:ring-[#861212] focus:border-transparent"
        />
      </div>

      {/* User Dropdown */}
      <div className="relative">
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex items-center gap-2 text-[#212121] hover:text-[#861212] transition-colors p-1 rounded-lg"
        >
          <div className="w-9 h-9 bg-[#861212] rounded-full flex items-center justify-center">
            <FiUser className="text-white w-5 h-5" />
          </div>
          <span className="text-[14px] font-medium hidden md:inline">Isabelle Kin</span>
          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
        </button>

        {isDropdownOpen && (
          <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-[#E5E5E5] rounded-lg shadow-lg py-2 z-50">
            <div className="px-4 py-3 border-b border-[#E5E5E5]">
              <p className="font-semibold text-[#212121] text-sm">Isabelle Kin</p>
              <p className="text-[#6D6D6D] text-xs">isabelle@company.com</p>
            </div>
            <Link href="/admin/profile" className="flex items-center gap-3 px-4 py-2 text-sm text-[#212121] hover:bg-[#F5F5F5] rounded-lg transition-colors">
              <FiUser className="w-4 h-4" />
              Profile
            </Link>
            <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-[#212121] hover:bg-[#F5F5F5] rounded-lg transition-colors">
              <FiLogOut className="w-4 h-4" />
              Sign out
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
