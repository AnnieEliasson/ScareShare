import React, { createContext, useContext, useState, ReactNode } from "react";
import data from "../data.json";

export type Monster = {
  id: number;
  name: string;
  color: string;
  eyes: number;
};

type Comment = {
  id: number;
  text: string;
  authorId: number;
};

export type Post = {
  id: number;
  title: string;
  text: string;
  authorId: number;
  comments: Comment[];
  viewComments: boolean;
};

type AppContextType = {
  monsters: Monster[];
  posts: Post[];
  user: Monster;
  setMonsters: (monsters: Monster[]) => void;
  setPosts: (posts: Post[]) => void;
  setUser: (user: Monster) => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [monsters, setMonsters] = useState<Monster[]>(data.monsters);
  const [posts, setPosts] = useState<Post[]>(data.posts);
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

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within a AppProvider");
  }
  return context;
};
