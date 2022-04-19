export interface ILocation {
    id: number
    lat: number
    lng: number
    name: string
    rating: number
    ratingId: number
    userId: number
}

export interface IRating {
    // createdAt: Date;
    // updatedAt: Date;
    userId: number;
    id: number;
    ratings: number;
}

export interface IUser {
    bio: string | null;
    id: number;
    profileImage: string;
    username: string;
}