export interface ILocation {
    createdAt: Date;
    updatedAt: Date;
    userId: number;
    id: number;
    lat: number;
    lng: number;
    name: string;
    rating: Array<IRating[]>;
}

export interface IRating {
    createdAt: Date;
    updatedAt: Date;
    userId: number;
    id: number;
    ratings: number;
}

export interface IUser {
    id: number;
    username: string;
    profileImage: string;
}