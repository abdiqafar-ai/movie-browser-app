"use client";
import { createContext, useContext, useState, useEffect } from "react";

const MyListContext = createContext();

export function MyListProvider({ children }) {
  const [myList, setMyList] = useState([]);

  useEffect(() => {
    // Load list from localStorage
    const savedList = localStorage.getItem("movieAppMyList");
    if (savedList) {
      setMyList(JSON.parse(savedList));
    }
  }, []);

  const addToMyList = (movie) => {
    const newList = [...myList, movie];
    setMyList(newList);
    localStorage.setItem("movieAppMyList", JSON.stringify(newList));
    return newList;
  };

  const removeFromMyList = (movieId) => {
    const newList = myList.filter((movie) => movie.id !== movieId);
    setMyList(newList);
    localStorage.setItem("movieAppMyList", JSON.stringify(newList));
    return newList;
  };

  const isInMyList = (movieId) => {
    return myList.some((movie) => movie.id === movieId);
  };

  const value = {
    myList,
    addToMyList,
    removeFromMyList,
    isInMyList,
  };

  return (
    <MyListContext.Provider value={value}>{children}</MyListContext.Provider>
  );
}

export function useMyList() {
  return useContext(MyListContext);
}
