import { Track } from "./track";

export interface Disc {
    sku: string;
    name: string;
    description: string;
    author: string;
    publisher: string;
    yearCreated: number;
    country: string;
    images: string[];
    categories: string[];
    trackList: Track[];
    favorite: boolean,
    type: string
}