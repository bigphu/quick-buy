// Global state management for Customer and Store selection
// Using localStorage to persist across pages

export const getCustomerId = () => {
    return parseInt(localStorage.getItem('customerId')) || 1;
};

export const setCustomerId = (id) => {
    localStorage.setItem('customerId', id);
    // Dispatch event so other components can react
    window.dispatchEvent(new Event('customerChanged'));
};

export const getStoreId = () => {
    return parseInt(localStorage.getItem('storeId')) || 1;
};

export const setStoreId = (id) => {
    localStorage.setItem('storeId', id);
    window.dispatchEvent(new Event('storeChanged'));
};

export const getCartId = () => {
    // CartID is linked to CustomerID in the database
    // For simplicity, we'll use customerId as cartId (assuming 1:1 relationship)
    return getCustomerId();
};

// Available customers and stores for dropdown
// NOTE: Update these names to match your database
export const CUSTOMERS = [
    { id: 1, name: 'Anh Nguyen' },
    { id: 2, name: 'Binh Tran' },
    { id: 3, name: 'Yen Le' },
    { id: 4, name: 'Dung Pham' },
    { id: 5, name: 'Em Hoang' },
];

export const STORES = [
    { id: 1, name: 'Store HCM - District 1' },
    { id: 2, name: 'Store HCM - District 7' },
    { id: 3, name: 'Store Hanoi' },
    { id: 4, name: 'Store Da Nang' },
    { id: 5, name: 'Store Can Tho' },
];