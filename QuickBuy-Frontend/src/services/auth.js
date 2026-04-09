const AUTH_KEY = 'quickbuyAuth';

export const getAuthUser = () => {
    const raw = localStorage.getItem(AUTH_KEY);
    if (!raw) {
        return null;
    }

    try {
        return JSON.parse(raw);
    } catch {
        return null;
    }
};

export const setAuthUser = (user) => {
    localStorage.setItem(AUTH_KEY, JSON.stringify(user));
    window.dispatchEvent(new Event('authChanged'));
};

export const clearAuthUser = () => {
    localStorage.removeItem(AUTH_KEY);
    window.dispatchEvent(new Event('authChanged'));
};

export const isAuthenticated = () => Boolean(getAuthUser());

export const getAuthRole = () => getAuthUser()?.role || null;
