"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useSidebar } from "@/context/SidebarContext";
import { useUser, UserRole } from "@/context/UserContext";
import SidebarWidget from "./SidebarWidget";
import { FiUser, FiActivity, FiHeart, FiUserPlus, FiBriefcase, FiClipboard, FiSettings, FiLogOut } from "react-icons/fi";
import { MdOutlineMedicalServices, MdOutlineDashboard } from "react-icons/md";
import { RiStethoscopeLine, RiMedicineBottleLine, RiHospitalLine } from "react-icons/ri";

type NavItem = {
  name: string;
  icon: React.ReactNode;
  path?: string;
  roles?: UserRole[]; // Which roles can see this item
  subItems?: { 
    name: string; 
    path: string; 
    badge?: string; 
    new?: boolean;
    roles?: UserRole[]; // Which roles can see this sub-item 
  }[];
};

// Define navigation items with role-based visibility
const allNavItems: NavItem[] = [
  {
    icon: <MdOutlineDashboard size={24} />,
    name: "Dashboard",
    path: "/dashboard",
    roles: ["admin", "doctor", "nurse", "patient", "superadmin"],
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M7.00001 3C4.79087 3 3.00001 4.79086 3.00001 7V17C3.00001 19.2091 4.79087 21 7.00001 21H17C19.2092 21 21 19.2091 21 17V7C21 4.79086 19.2092 3 17 3H7.00001ZM5.00001 7C5.00001 5.89543 5.89544 5 7.00001 5H17C18.1046 5 19 5.89543 19 7V17C19 18.1046 18.1046 19 17 19H7.00001C5.89544 19 5.00001 18.1046 5.00001 17V7ZM12 7C12.5523 7 13 7.44772 13 8V12.5858L14.7071 10.8787C15.0977 10.4882 15.7308 10.4882 16.1214 10.8787C16.5119 11.2693 16.5119 11.9024 16.1214 12.293L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L7.87869 12.293C7.48817 11.9024 7.48817 11.2693 7.87869 10.8787C8.26922 10.4882 8.90238 10.4882 9.29291 10.8787L11 12.5858V8C11 7.44772 11.4477 7 12 7Z" fill="currentColor"/>
      </svg>
    ),
    name: "Upload",
    path: "/upload",
    roles: ["admin", "doctor"],
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C9.79086 2 8 3.79086 8 6C8 8.20914 9.79086 10 12 10C14.2091 10 16 8.20914 16 6C16 3.79086 14.2091 2 12 2ZM6 6C6 2.68629 8.68629 0 12 0C15.3137 0 18 2.68629 18 6C18 9.31371 15.3137 12 12 12C8.68629 12 6 9.31371 6 6ZM8 14C5.79086 14 4 15.7909 4 18V20C4 21.1046 3.10457 22 2 22C0.895431 22 0 21.1046 0 20C0 18.8954 0.895431 18 2 18V18C2 14.6863 4.68629 12 8 12H16C19.3137 12 22 14.6863 22 18V18C23.1046 18 24 18.8954 24 20C24 21.1046 23.1046 22 22 22C20.8954 22 20 21.1046 20 20V18C20 15.7909 18.2091 14 16 14H8Z" fill="currentColor"/>
      </svg>
    ),
    name: "Patients",
    path: "/patient/details",
    roles: ["admin", "doctor", "nurse"],
  },
  {
    icon: <RiStethoscopeLine size={24} />,
    name: "Doctors",
    path: "/doctor/details",
    roles: ["admin"],
  },
  {
    icon: <RiHospitalLine size={24} />,
    name: "Hospital",
    path: "/superadmin/hospital/details",
    roles: ["superadmin"],
  },
];

// Bottom menu items
const bottomNavItems: NavItem[] = [
  {
    icon: <FiLogOut size={24} />,
    name: "Sign Out",
    path: "/auth/signout",
    roles: ["admin", "doctor", "nurse", "patient", "superadmin"],
  },
];

const AppSidebar: React.FC = () => {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
  const { user, logout } = useUser();
  const pathname = usePathname();
  const router = useRouter();

  // Filter navigation items based on user role
  const getNavItemsForRole = (items: NavItem[]): NavItem[] => {
    if (!user) return [];
    
    return items
      .filter(item => !item.roles || item.roles.includes(user.role))
      .map(item => {
        if (item.subItems) {
          return {
            ...item,
            subItems: item.subItems.filter(
              subItem => !subItem.roles || subItem.roles.includes(user.role)
            ),
          };
        }
        return item;
      });
  };

  const filteredNavItems = getNavItemsForRole(allNavItems);
  const filteredBottomNavItems = getNavItemsForRole(bottomNavItems);

  const handleSignOut = async (e: React.MouseEvent) => {
    e.preventDefault();
    logout();
    router.push('/auth/signin');
  };

  const renderMenuItems = (
    navItems: NavItem[],
    menuType: "main" | "others"
  ) => (
    <ul className="flex flex-col gap-2">
      {navItems.map((nav, index) => (
        <li key={nav.name}>
          {nav.subItems ? (
            <button
              onClick={() => handleSubmenuToggle(index, menuType)}
              className={`flex items-center w-full gap-3 px-3 py-2.5 rounded-lg ${
                openSubmenu?.type === menuType && openSubmenu?.index === index
                  ? "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-white"
                  : "text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
              } cursor-pointer ${
                !isExpanded && !isHovered
                  ? "lg:justify-center"
                  : "lg:justify-start"
              }`}
            >
              <span
                className={`${
                  openSubmenu?.type === menuType && openSubmenu?.index === index
                    ? "text-brand-500 dark:text-brand-400"
                    : "text-gray-600 dark:text-gray-400"
                }`}
              >
                {nav.icon}
              </span>
              {(isExpanded || isHovered || isMobileOpen) && (
                <span className="text-sm font-medium whitespace-nowrap">{nav.name}</span>
              )}
              {(isExpanded || isHovered || isMobileOpen) && (
                <svg 
                  className={`ml-auto w-5 h-5 transition-transform duration-200 ${
                    openSubmenu?.type === menuType &&
                    openSubmenu?.index === index
                      ? "rotate-180 text-brand-500"
                      : ""
                  }`}
                  width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"
                >
                  <path fillRule="evenodd" clipRule="evenodd" d="M5.29289 7.29289C5.68342 6.90237 6.31658 6.90237 6.70711 7.29289L10 10.5858L13.2929 7.29289C13.6834 6.90237 14.3166 6.90237 14.7071 7.29289C15.0976 7.68342 15.0976 8.31658 14.7071 8.70711L10.7071 12.7071C10.3166 13.0976 9.68342 13.0976 9.29289 12.7071L5.29289 8.70711C4.90237 8.31658 4.90237 7.68342 5.29289 7.29289Z" fill="currentColor"/>
                </svg>
              )}
            </button>
          ) : (
            nav.path && (
              nav.path === "/auth/signout" ? 
              // Special handling for signout
              <button
                onClick={handleSignOut}
                className={`flex items-center w-full gap-3 px-3 py-2.5 rounded-lg text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 ${
                  !isExpanded && !isHovered ? "lg:justify-center" : "lg:justify-start"
                }`}
              >
                <span className="text-gray-600 dark:text-gray-400">
                  {nav.icon}
                </span>
                {(isExpanded || isHovered || isMobileOpen) && (
                  <span className="text-sm font-medium whitespace-nowrap">{nav.name}</span>
                )}
              </button>
              :
              // Normal navigation links
              <Link
                href={nav.path}
                className={`flex items-center w-full gap-3 px-3 py-2.5 rounded-lg ${
                  isActive(nav.path) 
                    ? "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-white" 
                    : "text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
                } ${!isExpanded && !isHovered ? "lg:justify-center" : "lg:justify-start"}`}
              >
                <span
                  className={`${
                    isActive(nav.path)
                      ? "text-brand-500 dark:text-brand-400"
                      : "text-gray-600 dark:text-gray-400"
                  }`}
                >
                  {nav.icon}
                </span>
                {(isExpanded || isHovered || isMobileOpen) && (
                  <span className="text-sm font-medium whitespace-nowrap">{nav.name}</span>
                )}
              </Link>
            )
          )}
          {nav.subItems && (isExpanded || isHovered || isMobileOpen) && (
            <div
              ref={(el) => {
                subMenuRefs.current[`${menuType}-${index}`] = el;
              }}
              className="overflow-hidden transition-all duration-300"
              style={{
                height:
                  openSubmenu?.type === menuType && openSubmenu?.index === index
                    ? `${subMenuHeight[`${menuType}-${index}`]}px`
                    : "0px",
              }}
            >
              <ul className="mt-1 space-y-1 ml-9">
                {nav.subItems.map((subItem) => (
                  <li key={subItem.name}>
                    <Link
                      href={subItem.path}
                      className={`flex items-center py-2 px-3 rounded-lg text-sm ${
                        isActive(subItem.path)
                          ? "bg-brand-50 text-brand-500 dark:bg-brand-900/10 dark:text-brand-400"
                          : "text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
                      }`}
                    >
                      {subItem.name}
                      <span className="flex items-center gap-1 ml-auto">
                        {subItem.new && (
                          <span
                            className="ml-auto px-1.5 py-0.5 rounded text-xs font-medium bg-brand-50 text-brand-500 dark:bg-brand-900/10 dark:text-brand-400"
                          >
                            new
                          </span>
                        )}
                        {subItem.badge && (
                          <span
                            className="ml-auto px-1.5 py-0.5 rounded text-xs font-medium bg-brand-50 text-brand-500 dark:bg-brand-900/10 dark:text-brand-400"
                          >
                            {subItem.badge}
                          </span>
                        )}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </li>
      ))}
    </ul>
  );

  const [openSubmenu, setOpenSubmenu] = useState<{
    type: "main" | "others";
    index: number;
  } | null>(null);
  const [subMenuHeight, setSubMenuHeight] = useState<Record<string, number>>(
    {}
  );
  const subMenuRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const isActive = useCallback((path: string) => path === pathname, [pathname]);

  useEffect(() => {
    // Check if the current path matches any submenu item
    let submenuMatched = false;
    ["main", "others"].forEach((menuType) => {
      const items = menuType === "main" ? filteredNavItems : [];
      items.forEach((nav, index) => {
        if (nav.subItems) {
          nav.subItems.forEach((subItem) => {
            if (isActive(subItem.path)) {
              setOpenSubmenu({
                type: menuType as "main" | "others",
                index,
              });
              submenuMatched = true;
            }
          });
        }
      });
    });

    // If no submenu item matches, close the open submenu
    if (!submenuMatched) {
      setOpenSubmenu(null);
    }
  }, [pathname, isActive, filteredNavItems]);

  useEffect(() => {
    // Set the height of the submenu items when the submenu is opened
    if (openSubmenu !== null) {
      const key = `${openSubmenu.type}-${openSubmenu.index}`;
      if (subMenuRefs.current[key]) {
        setSubMenuHeight((prevHeights) => ({
          ...prevHeights,
          [key]: subMenuRefs.current[key]?.scrollHeight || 0,
        }));
      }
    }
  }, [openSubmenu]);

  const handleSubmenuToggle = (index: number, menuType: "main" | "others") => {
    setOpenSubmenu((prevOpenSubmenu) => {
      if (
        prevOpenSubmenu &&
        prevOpenSubmenu.type === menuType &&
        prevOpenSubmenu.index === index
      ) {
        return null;
      }
      return { type: menuType, index };
    });
  };

  return (
    <>
      <aside
        className={`h-screen ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        } fixed top-0 left-0 z-40 flex flex-col bg-white border-r border-gray-200 transition-transform duration-300 lg:translate-x-0 dark:border-gray-800 dark:bg-gray-900 ${
          !isExpanded && !isHovered ? "lg:w-[90px]" : "lg:w-[280px]"
        } w-[280px]`}
        onMouseEnter={() => {
          if (!isMobileOpen) {
            setIsHovered(true);
          }
        }}
        onMouseLeave={() => {
          if (!isMobileOpen) {
            setIsHovered(false);
          }
        }}
      >
        <div
          className={`py-4 ${
            (!isExpanded && !isHovered) ? "px-3" : "px-5"
          } flex h-16 shrink-0 items-center border-b border-gray-200 dark:border-gray-800`}
        >
          <Link href="/" className="flex items-center gap-2">
            <span className="shrink-0 block">
              <Image 
                src="/logo-icon.svg" 
                className="h-8 w-8 dark:hidden" 
                width={32} 
                height={32} 
                alt="ThynkPro Logo" 
              />
              <Image 
                src="/logo-dark.svg" 
                className="h-8 w-8 hidden dark:block" 
                width={32} 
                height={32} 
                alt="ThynkPro Logo" 
              />
            </span>
            {(isExpanded || isHovered || isMobileOpen) && (
              <div className="relative h-7 w-28">
                <h1 className="text-2xl font-bold">ThynkPro</h1>
              </div>
            )}
          </Link>
        </div>
        <div
          className={`flex flex-col justify-between h-full overflow-y-auto ${
            !isExpanded && !isHovered ? "px-3" : "px-5"
          } py-5`}
        >
          <nav className="mb-6 flex-1">
            <div className="flex flex-col gap-5">
              <div>
                <h2
                  className={`mb-3 text-xs uppercase font-medium flex leading-tight text-gray-400 ${
                    !isExpanded && !isHovered
                      ? "lg:justify-center"
                      : "justify-start"
                  } px-3 pt-1`}
                >
                  {isExpanded || isHovered || isMobileOpen ? (
                    "Menu"
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M17.5 10C17.5 10.2652 17.3946 10.5196 17.2071 10.7071C17.0196 10.8946 16.7652 11 16.5 11H3.5C3.23478 11 2.98043 10.8946 2.79289 10.7071C2.60536 10.5196 2.5 10.2652 2.5 10C2.5 9.73478 2.60536 9.48043 2.79289 9.29289C2.98043 9.10536 3.23478 9 3.5 9H16.5C16.7652 9 17.0196 9.10536 17.2071 9.29289C17.3946 9.48043 17.5 9.73478 17.5 10ZM3.5 5H16.5C16.7652 5 17.0196 5.10536 17.2071 5.29289C17.3946 5.48043 17.5 5.73478 17.5 6C17.5 6.26522 17.3946 6.51957 17.2071 6.70711C17.0196 6.89464 16.7652 7 16.5 7H3.5C3.23478 7 2.98043 6.89464 2.79289 6.70711C2.60536 6.51957 2.5 6.26522 2.5 6C2.5 5.73478 2.60536 5.48043 2.79289 5.29289C2.98043 5.10536 3.23478 5 3.5 5ZM3.5 13H16.5C16.7652 13 17.0196 13.1054 17.2071 13.2929C17.3946 13.4804 17.5 13.7348 17.5 14C17.5 14.2652 17.3946 14.5196 17.2071 14.7071C17.0196 14.8946 16.7652 15 16.5 15H3.5C3.23478 15 2.98043 14.8946 2.79289 14.7071C2.60536 14.5196 2.5 14.2652 2.5 14C2.5 13.7348 2.60536 13.4804 2.79289 13.2929C2.98043 13.1054 3.23478 13 3.5 13Z" fill="currentColor"/>
                    </svg>
                  )}
                </h2>
                {renderMenuItems(filteredNavItems, "main")}
              </div>
            </div>
          </nav>
          
          {/* Bottom menu items (signout, etc) */}
          <div className="mt-auto border-t border-gray-200 dark:border-gray-800 pt-4">
            {user && (isExpanded || isHovered || isMobileOpen) && (
              <div className="flex items-center gap-3 px-3 py-2 mb-3">
                <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center overflow-hidden">
                  {user.avatar ? (
                    <Image src={user.avatar} width={32} height={32} alt={user.name} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-sm font-medium">{user.name.charAt(0)}</span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 dark:text-white truncate">{user.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">{user.role}</p>
                </div>
              </div>
            )}
            
            {renderMenuItems(filteredBottomNavItems, "others")}
          </div>
        </div>
      </aside>
    </>
  );
};

export default AppSidebar; 