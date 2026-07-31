import { Amenity } from "./amenity";

export interface GalleryImage {
  publicId: string;
  alt: string;
}
export interface Room {
    id: number;
    name: string;
    description: string;
    capacity: number;
    pricePerNight: number;
    coverImage: string;
    gallery: GalleryImage[];
    amenities: Amenity[];
}
