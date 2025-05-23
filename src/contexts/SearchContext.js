import { createContext, useState } from 'react';

export const SearchContext = createContext();

export default function SearchProvider({ children }) {
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <SearchContext.Provider value={{ searchTerm, setSearchTerm }}>
      {children}
    </SearchContext.Provider>
  );
}
