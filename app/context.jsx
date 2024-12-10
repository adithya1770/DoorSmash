import React, { createContext, useState } from 'react';

const MyContext = createContext();

const MyProvider = ({ children }) => {
    const [name, setName] = useState('');

    return (
        <MyContext.Provider value={{ name, setName }}>
            {children}
        </MyContext.Provider>
    );
};

export { MyContext, MyProvider };
