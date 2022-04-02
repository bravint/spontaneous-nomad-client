const SERVER_ADDRESS = process.env.REACT_APP_SERVER_ADDRESS as string;

export const STORE_ACTIONS = {
    USER: 'user' as string,
};

export const HTTP_METHOD = {
    GET: 'GET' as string,
    POST: 'POST' as string,
    PATCH: 'PATCH' as string,
    PUT: 'PUT' as string,
    DELETE: 'DELETE' as string,
};

export const LOCAL_PATH = {
    DASHBOARD: '/dashboard' as string,
    HOME: '/' as string,
    LOGIN: '/login' as string,
    REGISTER: '/register' as string,
    SUCCESS: '/success' as string,
};

export const LOCAL_STORAGE = {
    JWT: 'jwt' as string,
};

export const HTTP_AUTH_TYPE = {
    BEARER: 'Bearer ' as string,
};

export const SERVER_URL = {
    AUTH_USER: `${SERVER_ADDRESS}/auth/user` as string,
    AUTH_LOGIN: `${SERVER_ADDRESS}/auth/login` as string,
    AUTH_REGISTER: `${SERVER_ADDRESS}/auth/register` as string,
    OAUTH_GOOGLE: `${SERVER_ADDRESS}/auth/google` as string,
    OAUTH_FACEBOOK: `${SERVER_ADDRESS}/auth/google` as string,
};
