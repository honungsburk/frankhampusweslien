import { Resolution } from "./Resolution";

export type Artwork = {
  name: string;
  collection: string;
  description?: string;
  saleInfo?: SaleInfo;
  src: string;
  resolution?: Resolution;
  createdAt: Date;
  token?: {
    policyID: string;
    assetName: string;
    onChainMetadata: ChainMetadata;
  };
};

export type SaleInfo = {
  price: string;
  status: "Available" | "Reserved" | "Sold" | "Error";
};

export type ChainMetadata = {
  name: string;
  image: string;
  mediaType: string;
  files: { src: string; name: string; mediaType: string }[];
};

export function lowResSrc(artwork: Artwork): string {
  return "";
}

export function thumbNailSrc(artwork: Artwork): string {
  return "";
}

export function description(art: Artwork): string {
  return `**AlgoMarble** is a series of 512 unique generative artworks. Each artwork can be bought as a one-of-a-kind NFT.&nbsp;  
  &nbsp;  
  The basic idea was to stack layers of noise on top of each other until fantastical textures emerged. 
  This is not a completely new idea but can trace its orgin back as far as 1983 with the invention of Perlin noise by Ken Perlin. 
  If you want to check out the code you can head over to the [git repo](https://gitlab.com/HampusWeslien/algomarble). 
  Where you will also find further explanations and instructions for generating super high resolution images. 
  The algorithm uses the name of the artwork as the seed, in this case the seed is '511'.&nbsp;  
  &nbsp;  
  There is also a [youtube video](https://www.youtube.com/watch?v=q1AVe5wOdR4&feature=youtu.be) that explain the basic idea behind the algorithm.&nbsp;  
  &nbsp;  
  Some of the images are not made justice when they are made to small. 
  If the image looks pixelated I recommend downloading the high resolution image; you find the download link beneath the image.`;
}
