import * as yup from "yup";
export declare type ArtCounter = {
    total: number;
    available: number;
    reserved: number;
    sold: number;
    notForSale: number;
    error: number;
};
export declare const artCounterSchema: yup.ObjectSchema<ArtCounter>;
export declare function artCounterInit(): ArtCounter;
export declare function eq(l: ArtCounter, r: ArtCounter): boolean;
