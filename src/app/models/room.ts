import { Amenity } from "./amenity";

export interface Room {
    id: number;
    name: string;
    description: string;
    capacity: number;
    pricePerNight: number;
    coverImage: string;
    gallery: string[];
    amenities: Amenity[];
}
