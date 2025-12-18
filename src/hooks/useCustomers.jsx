import React, { createContext, useContext, useState, useEffect } from 'react';

const CustomerContext = createContext();

const STORAGE_KEY = 'tailorship_customers';

export const CustomerProvider = ({ children }) => {
    const [customers, setCustomers] = useState(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(customers));
    }, [customers]);

    const addCustomer = (customer) => {
        const newCustomer = {
            ...customer,
            id: Date.now().toString(),
            createdAt: new Date().toISOString()
        };
        setCustomers(prev => [...prev, newCustomer]);
        return newCustomer;
    };

    const updateCustomer = (id, updatedData) => {
        setCustomers(prev => prev.map(c => c.id === id ? { ...c, ...updatedData } : c));
    };

    const deleteCustomer = (id) => {
        setCustomers(prev => prev.filter(c => c.id !== id));
    };

    const getCustomer = (id) => {
        return customers.find(c => c.id === id);
    };

    return (
        <CustomerContext.Provider value={{
            customers,
            addCustomer,
            updateCustomer,
            deleteCustomer,
            getCustomer
        }}>
            {children}
        </CustomerContext.Provider>
    );
};

export const useCustomers = () => {
    const context = useContext(CustomerContext);
    if (!context) {
        throw new Error('useCustomers must be used within a CustomerProvider');
    }
    return context;
};
