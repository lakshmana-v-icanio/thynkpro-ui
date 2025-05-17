"use client";
import { createContext, useContext, useState, ReactNode, useEffect } from "react";

// Define user roles
export type UserRole = "admin" | "doctor" | "nurse" | "patient" | "superadmin";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

// Hard-coded test users with different roles
export const TEST_USERS: User[] = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@thynkpro.com",
    role: "admin",
    avatar: "https://randomuser.me/api/portraits/women/55.jpg",
  },
  {
    id: "2",
    name: "Doctor Smith",
    email: "doctor@thynkpro.com",
    role: "doctor",
    avatar: "/avatars/doctor.png",
  },
  {
    id: "3",
    name: "Nurse Johnson",
    email: "nurse@thynkpro.com",
    role: "nurse",
    avatar: "/avatars/nurse.png",
  },
  {
    id: "4",
    name: "Patient Doe",
    email: "patient@thynkpro.com",
    role: "patient",
    avatar: "/avatars/patient.png",
  },
  {
    id: "5",
    name: "Super Admin",
    email: "superadmin@thynkpro.com",
    role: "superadmin",
    avatar: "https://randomuser.me/api/portraits/women/55.jpg",
  },
];

// Password for all test users
export const TEST_PASSWORD = "password123";

interface UserContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  
  // Check for saved user in localStorage on initial load
  useEffect(() => {
    const savedUser = localStorage.getItem("thynkpro_user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        console.error("Failed to parse saved user:", e);
        localStorage.removeItem("thynkpro_user");
      }
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Find user by email
    const foundUser = TEST_USERS.find(user => user.email.toLowerCase() === email.toLowerCase());
    
    // Check if user exists and password matches
    if (foundUser && password === TEST_PASSWORD) {
      setUser(foundUser);
      localStorage.setItem("thynkpro_user", JSON.stringify(foundUser));
      return true;
    }
    
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("thynkpro_user");
  };

  return (
    <UserContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}; 