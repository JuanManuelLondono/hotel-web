import { Amenity } from "./amenity";

export interface HotelInfo {
    name: string;
    slogan: string;
    description: string;
    address: string;
    phoneWhatsapp: string;   
    heroImages: string[];    
    amenities: Amenity[];
}
