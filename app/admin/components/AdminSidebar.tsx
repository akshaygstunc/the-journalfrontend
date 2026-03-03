// // app/admin/_components/AdminSidebar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  RxDashboard,
} from "react-icons/rx";
import {
  PiArticleMediumBold,
  PiStackSimpleBold,
} from "react-icons/pi";
import { HiOutlinePhotograph } from "react-icons/hi";
import { FiUsers } from "react-icons/fi";
import { FaRegChartBar  } from "react-icons/fa";
import { FiSettings } from "react-icons/fi";

const navItems = [
  {
    label: "Dashboard",
    href: "/admin",
    icon: RxDashboard,
    badge: 2,
  },
  {
    label: "Articles",
    href: "/admin/articles",
    icon: PiArticleMediumBold,
    children: [
      { label: "Working Stories", href: "/admin/articles/working-stories" },
      { label: "Published", href: "/admin/articles/published" },
    ],
  },
  {
    label: "Media Library",
    href: "/admin/media-library",
    icon: HiOutlinePhotograph,
  },
  {
    label: "Source Management",
    href: "/admin/source-management",
    icon: PiStackSimpleBold,
  },
  {
    label: "User Roles",
    href: "/admin/user-roles",
    icon: FiUsers,
  },
  {
    label: "Analytics",
    href: "/admin/analytics",
    icon: FaRegChartBar ,
  },
  {
    label: "Settings",
    href: "/admin/settings",
    icon: FiSettings,
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="h-screen w-55 bg-[#F5F5F5] flex flex-col border-r border-[#E5E5E5]">
      {/* Logo area */}
      <div className="flex items-center gap-2 px-6 pt-6 pb-8">
        <div className="h-8 w-8 rounded-full bg-[#861212] flex items-center justify-center">
          <span className="text-white text-[12px] font-semibold leading-none">
            L
          </span>
        </div>
        <span className="text-[16px] font-semibold text-[#212121]">
          TheJournal
        </span>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              pathname === item.href ||
              (item.children &&
                item.children.some((c) => pathname.startsWith(c.href)));

            return (
              <li key={item.href}>
                {/* Top level item */}
                <Link
                  href={item.href}
                  className={[
                    "flex items-center justify-between rounded-lg px-3 py-2",
                    "transition-colors",
                    "text-[14px]",
                    isActive
                      ? "bg-white text-[#861212] shadow-sm"
                      : "text-[#6D6D6D] hover:text-[#212121]",
                  ].join(" ")}
                >
                  <span className="flex items-center gap-2">
                    <Icon
                      className={
                        isActive ? "text-[#861212]" : "text-[#6D6D6D]"
                      }
                      size={18}
                    />
                    <span className="truncate">{item.label}</span>
                  </span>

                  {item.badge && (
                    <span className="ml-2 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-[#861212] text-[11px] font-medium text-white">
                      {item.badge}
                    </span>
                  )}
                </Link>

                {/* Children for Articles */}
                {item.children && (
                  <ul className="mt-1 ml-6 space-y-1 border-l border-[#E5E5E5] pl-3">
                    {item.children.map((child) => {
                      const childActive = pathname === child.href;
                      return (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            className={[
                              "block rounded-md px-3 py-1.5 text-[13px]",
                              childActive
                                ? "bg-white text-[#861212] shadow-sm"
                                : "text-[#6D6D6D] hover:text-[#212121]",
                            ].join(" ")}
                          >
                            {child.label}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
