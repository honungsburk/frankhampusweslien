import { Timestamp } from "firebase/firestore";
import { Resolution } from "./Resolution";

export type Artwork = {
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

export const collections: ArtCollection[] = [
  "MOTION",
  "AlgoMarble",
  "Stained Glass",
  "Frank's Fine Forms",
];

export type ArtCollection =
  | "MOTION"
  | "AlgoMarble"
  | "Stained Glass"
  | "Frank's Fine Forms";

export type Token = {
  policyID: string;
  assetName: string;
  onChainMetadata: ChainMetadata;
};

export type SaleInfo = ForSale | Gift;

type Gift = {
  status: "Gift";
};

type ForSale = {
  price: string;
  status: SaleStatus;
};

export type SaleStatus = "Available" | "Reserved" | "Sold";

/**
 *
 * @param s the saleStatus
 * @returns color to be used to communicate to the user of the state of the sale
 */
export function saleStatusColor(
  saleStatus?: SaleStatus | "Error" | "Gift"
): string {
  switch (saleStatus) {
    case "Available":
      return "success.500";
    case "Reserved":
      return "primary.500";
    case "Sold":
      return "secondary.500";
    case "Gift":
      return "secondary.500";
    case "Error":
      return "failure.500";
    default:
      return "accent.600";
  }
}

export type ChainMetadata = {
  name: string;
  image: string;
  mediaType: string;
  files: { src: string; name: string; mediaType: string }[];
};

export function lowResSrc(src: string): string {
  const [path, ext] = src.split(".");
  if (ext !== "svg" && ext !== "mp4") {
    return path + "_low_res.jpg";
  } else {
    return src;
  }
}

export function thumbNailSrc(src: string): string {
  const [path, ext] = src.split(".");
  return path + "_thumb_nail.jpg";
}

const algorMarbleDesc = `**AlgoMarble** is a series of 512 unique generative artworks. Each artwork can be bought as a one-of-a-kind NFT.&nbsp;  
&nbsp;  
The basic idea was to stack layers of noise on top of each other until fantastical textures emerged. 
This is not a completely new idea but can trace its orgin back as far as 1983 with the invention of Perlin noise by Ken Perlin. 
If you want to check out the code you can head over to the [git repo](https://github.com/honungsburk/AlgoMarble). 
Where you will also find further explanations and instructions for generating super high resolution images. 
The algorithm uses the name of the artwork as the seed, in this case the seed is '511'.&nbsp;  
&nbsp;  
There is also a [youtube video](https://www.youtube.com/watch?v=q1AVe5wOdR4&feature=youtu.be) that explain the basic idea behind the algorithm.&nbsp;  
&nbsp;  
Some of the images are not made justice when they are made to small. 
If the image looks pixelated I recommend downloading the high resolution image; you find the download link beneath the image.`;

const motionDesc = `**MOTION** is a series of 128 unique generative artworks. 
Each artwork can be bought as a one-of-a-kind NFT and includes: 
a video thumbnail (displayed in NFT marketplaces), a 30s video optimized for social media, 
the code and data to generate longer/higher quality videos.&nbsp;  
&nbsp;  
To create this series I thought of the program I wrote more of as a tool then an independent process for generating art. 
In my last work (AlgoMarble) there was no human intervention; 
It simply generated what it generated. This time I used my program more like a abstract brush and used it to come up 128 unqiue creations.&nbsp;  
&nbsp;  
I had seen people use vector fields (or flow fields) to create very dynamic images so I thought that maybe I could place particles inside of them and let them move around. 
Of course I'm not the first person to explore this idea; 
there is an excellent webapp developed by Andrei Kashcha called field play (search for it on google) that I played around with for a bit for getting inspiration. 
If you want to checkout the code I wrote you can do so at the [git repo](https://github.com/honungsburk/MOTION). 
Where you will also find further explanations and instructions for generating high quality videos.&nbsp;  
&nbsp;  
I'm trying to experiment a bit with monitization of my work. 
Note that all NFTs in the MOTION collection have 2.5% royalty when sold through a marketplace that supports the CIP-027 standard. 
What does this mean for you as a buyer? 
It means that if you resell yout NFT for 100 ADA then 2.5 ADA will be sent to me.`;

const stainedGlassDesc = `**Stained Glass** is a series of 100 unique generative artworks.
Each artwork can be bought as a one-of-a-kind NFT.&nbsp;  
&nbsp;  
A few of the artworks have also been given a community name (within parentheses) by the first owner. 
If a community name hasn't already been given, and you own the piece, you can fill [this form](https://docs.google.com/forms/d/e/1FAIpQLSej_g9qwhRltYhTmyp3oAJeCTeusplBQgy5Ft8dMO4whEt70w/viewform) and DM me on twitter (so I get notified). 
Two rules: no obscenities, and it must be in English.&nbsp;  
&nbsp;  
They were created by splitting triangles recursively, each with its own unique combination of how often a split occurs, how the triangles are split, and the color palette. 
The images are stored as SVG images (a.k.a. infinite resolution). 
They were designed to work as background images on any screen: mobile, tablet, or desktop.&nbsp;  
&nbsp;  
If you want to take an indepth look at the code check out the [git repo](https://github.com/honungsburk/Stained-Glass). 
The number/name of the image (98763993) is used as the seed.`;

const franksFineFormsDesc = "All art I have painted by hand (or Ipad).";

export function collectionDescription(art: Artwork): string {
  switch (art.collection) {
    case "AlgoMarble":
      return algorMarbleDesc;
    case "Stained Glass":
      return stainedGlassDesc;
    case "Frank's Fine Forms":
      return franksFineFormsDesc;
    case "MOTION":
      return motionDesc;
  }
}
