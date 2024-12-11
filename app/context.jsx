import React, { createContext, useState } from 'react';

const MyContext = createContext();

const MyProvider = ({ children }) => {
    const [name, setName] = useState('');
    const [cost, setCost] = useState(null);
    const [data, setData] = useState([]);
    const [id, setId] = useState('');
    return (
        <MyContext.Provider value={{ name, setName, cost, setCost, data, setData, id, setId }}>
            {children}
        </MyContext.Provider>
    );
};

export { MyContext, MyProvider };
