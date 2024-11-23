import React, { createContext, useContext, useState, ReactNode } from "react";
import data from "../data.json";
// Typ för Monster
export type Monster = {
  id: number;
  name: string;
  color: string;
  eyes: number;
};

// Typ för Comment
type Comment = {
  id: number;
  text: string;
  authorId: number;
};

// Typ för Post
export type Post = {
  id: number;
  title: string;
  text: string;
  authorId: number;
  comments: Comment[];
  viewComments: boolean;
};

// Typ för kontexten
type AppContextType = {
  monsters: Monster[];
  posts: Post[];
  user: Monster;
  setMonsters: (monsters: Monster[]) => void;
  setPosts: (posts: Post[]) => void;
  setUser: (user: Monster) => void;
};

// Skapa kontexten
const AppContext = createContext<AppContextType | undefined>(undefined);

// Provider-komponenten
export const AppProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [monsters, setMonsters] = useState<Monster[]>(data.monsters); // För monsters
  const [posts, setPosts] = useState<Post[]>(data.posts); // För posts
  const [user, setUser] = useState<Monster>({
    id: 0,
    name: "",
    color: "",
    eyes: 0,
  });

  return (
    <AppContext.Provider
      value={{ monsters, posts, user, setMonsters, setPosts, setUser }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Hook för att använda kontexten
export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within a AppProvider");
  }
  return context;
};
