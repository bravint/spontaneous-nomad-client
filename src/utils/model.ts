export interface ILocation {
    id: number;
    lat: number;
    lng: number;
    name: string;
    rating: number;
    ratingId: number;
    userId: number;
}

export interface IRating {
    userId: number;
    id: number;
    ratings: number;
}

export interface IUser {
    bio: string;
    id: number;
    profileImage: string;
    username: string;
}

export interface IFriend {
    bio: string | null;
    id: number;
    profileImage: string;
    username: string;
}

export interface ILocationToCreate {
    lat: number;
    lng: number;
}
