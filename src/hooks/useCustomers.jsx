import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const CustomerContext = createContext();

const API_BASE_URL = '/api';

export const CustomerProvider = ({ children }) => {
    const [userId, setUserId] = useState(localStorage.getItem('tailorship_userid'));
    const [customers, setCustomers] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(!!userId);
    const [loading, setLoading] = useState(false);

    const fetchCustomers = useCallback(async () => {
        if (!userId) return;
        setLoading(true);
        try {
            const response = await fetch(`${API_BASE_URL}/customers`, {
                headers: { 'x-user-id': userId }
            });
            const data = await response.json();
            setCustomers(data);
        } catch (error) {
            console.error('Error fetching customers:', error);
        } finally {
            setLoading(false);
        }
    }, [userId]);

    useEffect(() => {
        if (userId) {
            fetchCustomers();
        } else {
            setCustomers([]);
        }
    }, [userId, fetchCustomers]);

    const login = async (id) => {
        try {
            const response = await fetch(`${API_BASE_URL}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: id })
            });

            const contentType = response.headers.get("content-type");
            if (contentType && contentType.indexOf("application/json") !== -1) {
                const data = await response.json();
                if (response.ok && data.success) {
                    setUserId(id);
                    localStorage.setItem('tailorship_userid', id);
                    setIsLoggedIn(true);
                    return { success: true };
                } else {
                    return { success: false, error: data.error || 'Login failed' };
                }
            } else {
                return { success: false, error: 'Server returned an unexpected response format' };
            }
        } catch (error) {
            console.error('Login error:', error);
            return { success: false, error: 'Cannot connect to server. Please check your connection.' };
        }
    };

    const register = async (id) => {
        try {
            const response = await fetch(`${API_BASE_URL}/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: id })
            });

            const contentType = response.headers.get("content-type");
            if (contentType && contentType.indexOf("application/json") !== -1) {
                const data = await response.json();
                if (response.ok && data.success) {
                    setUserId(id);
                    localStorage.setItem('tailorship_userid', id);
                    setIsLoggedIn(true);
                    return { success: true };
                } else {
                    return { success: false, error: data.error || 'Registration failed' };
                }
            } else {
                return { success: false, error: 'Server returned an unexpected response format' };
            }
        } catch (error) {
            console.error('Registration error:', error);
            return { success: false, error: 'Cannot connect to server. Please check your connection.' };
        }
    };

    const logout = () => {
        setUserId(null);
        localStorage.removeItem('tailorship_userid');
        setIsLoggedIn(false);
        setCustomers([]);
    };

    const addCustomer = async (customer) => {
        try {
            const response = await fetch(`${API_BASE_URL}/customers`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-user-id': userId
                },
                body: JSON.stringify(customer)
            });
            const newCustomer = await response.json();
            setCustomers(prev => [...prev, newCustomer]);
            return newCustomer;
        } catch (error) {
            console.error('Error adding customer:', error);
        }
    };

    const updateCustomer = async (id, updatedData) => {
        try {
            await fetch(`${API_BASE_URL}/customers/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'x-user-id': userId
                },
                body: JSON.stringify(updatedData)
            });
            setCustomers(prev => prev.map(c => c.id === id ? { ...c, ...updatedData } : c));
        } catch (error) {
            console.error('Error updating customer:', error);
        }
    };

    const deleteCustomer = async (id) => {
        try {
            await fetch(`${API_BASE_URL}/customers/${id}`, {
                method: 'DELETE',
                headers: { 'x-user-id': userId }
            });
            setCustomers(prev => prev.filter(c => c.id !== id));
        } catch (error) {
            console.error('Error deleting customer:', error);
        }
    };

    const getCustomer = (id) => {
        return customers.find(c => c.id === id);
    };

    return (
        <CustomerContext.Provider value={{
            customers,
            isLoggedIn,
            loading,
            userId,
            login,
            register,
            logout,
            addCustomer,
            updateCustomer,
            deleteCustomer,
            getCustomer,
            refreshCustomers: fetchCustomers
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
