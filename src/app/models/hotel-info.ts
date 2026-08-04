import { Amenity } from "./amenity";

export interface AboutBlock {
  title: string;
  text: string;
  imagePublicId: string;
  imageAlt: string;
}

export interface HotelInfo {
  name: string;
  slogan: string;
  description: string;
  address: string;
  phoneWhatsapp: string;
  heroImage: string;
  aboutTitle: string;
  aboutText: string;
  aboutBlocks: AboutBlock[];
  amenities: Amenity[];
}
