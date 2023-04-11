import React, { createContext, useState } from 'react';

export const ListContext = createContext();

function ListContextProvider({ children }) {
  const [selectedList, setSelectedList] = useState(null);

  const handleListSelect = (list) => {
    setSelectedList(list);
  };

  return (
    <ListContext.Provider value={{ selectedList, handleListSelect }}>
      {children}
    </ListContext.Provider>
  );
}

export default ListContextProvider;
