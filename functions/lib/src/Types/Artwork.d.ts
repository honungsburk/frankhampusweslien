import { Timestamp } from "firebase/firestore";
import { Resolution } from "./Resolution";
import * as yup from "yup";
export declare type ChainMetadata = {
    name: string;
    image: string;
    mediaType: string;
    files: {
        src: string;
        name: string;
        mediaType: string;
    }[];
};
export declare const chainMetadataSchema: yup.ObjectSchema<ChainMetadata>;
export declare type Token = {
    policyID: string;
    assetName: string;
    onChainMetadata: ChainMetadata;
};
export declare const tokenSchema: yup.ObjectSchema<Token>;
export declare type SaleStatus = "Available" | "Reserved" | "Sold";
export declare const saleStatusSchema: yup.StringSchema<SaleStatus>;
/**
 *
 * @param s the saleStatus
 * @returns color to be used to communicate to the user of the state of the sale
 */
export declare function saleStatusColor(saleStatus?: SaleStatus | "Error" | "Gift"): string;
export declare type SaleInfo = ForSale | Gift;
declare type Gift = {
    status: "Gift";
};
declare type ForSale = {
    price: string;
    status: SaleStatus;
};
export declare const forSaleSchema: yup.ObjectSchema<ForSale>;
export declare type Artwork = {
    name: string;
    collection: ArtCollection;
    canUpdateCommunityName: boolean;
    communityName?: string;
    description?: string;
    saleInfo?: SaleInfo;
    src: string;
    tags: string[];
    resolution?: Resolution;
    createdAt: Timestamp;
    token?: Token;
};
export declare const collections: ArtCollection[];
export declare type ArtCollection = "MOTION" | "AlgoMarble" | "Stained Glass" | "Frank's Fine Forms";
export declare function lowResSrc(src: string): string;
export declare function thumbNailSrc(src: string): string;
export declare function collectionDescription(art: Artwork): string;
export {};
