const SERVER_ADDRESS = process.env.REACT_APP_SERVER_ADDRESS as string;

export const GOOGLE_MAPS_API_KEY = process.env
    .REACT_APP_GOOGLE_MAPS_API_KEY as string;

export const NUMBER_OF_RECENT_FRIENDS_TO_RENDER = 5 as number;

export const NUMBER_OF_TOP_LOCATIONS_TO_RENDER = 5 as number;

export const STORE_ACTIONS = {
    FRIEND_ID: 'friendId' as string,
    FRIEND_NAME: 'friendName' as string,
    USER: 'user' as string,
    LOCATIONS: 'locations' as string,
    RATING: 'rating' as string,
    FRIENDS: 'friends' as string,
    SELECTED_LOCATION: 'selectedLocation' as string,
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
    MAP: '/map' as string,
    PROFILE: '/profile' as string,
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
    AUTH_PROFILE: `${SERVER_ADDRESS}/profile` as string,
    AUTH_REGISTER: `${SERVER_ADDRESS}/auth/register` as string,
    FOLLOW: `${SERVER_ADDRESS}/follow` as string,
    LOCATION: `${SERVER_ADDRESS}/location` as string,
    OAUTH_GOOGLE: `${SERVER_ADDRESS}/auth/google` as string,
    OAUTH_FACEBOOK: `${SERVER_ADDRESS}/auth/google` as string,
    RATING: `${SERVER_ADDRESS}/rating` as string,
};
