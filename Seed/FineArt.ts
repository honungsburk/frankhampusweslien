import { Artwork } from "../src/Types/Artwork";
import { adaToLovelace, timestampAt, TokenID } from "./Helpers";

export const devArtworks = [
  "Aristocrat",
  "Magical Rocks",
  "Farsan",
  "Rising Bull",
];

/**
 *
 * @param artwork the artwork
 * @returns
 */
export function possibleTokenID(artwork: Artwork): TokenID {
  if (artwork.name === "This Is Not A Banana") {
    return {
      policyID: "6ce34ca46c79a999643e9d58f04feca4e609370ca8745344dd08b443",
      tokenName: "ThisIsNotABanana",
    };
  } else {
    return {
      policyID: "dd04ad427b8c2f76409502907063239518d81ad7415046e170d3da07",
      tokenName: "FHWART" + artwork.name.replace(/[^0-9a-zA-Z]/gi, ""),
    };
  }
}

export const fineart: Artwork[] = [
  {
    name: "Aristocrat",
    description: "A copy of another artist's work. It was made for practice.",
    collection: "Frank's Fine Forms",
    canUpdateCommunityName: false,
    src: "images/Aristocrat-Dishonored.jpg",
    resolution: {
      x: 1700,
      y: 3000,
    },
    tags: ["Krita", "Portrait", "Character", "Dishonored"],
    createdAt: timestampAt("2020-7-4"),
  },
  {
    name: "Magical Rocks",
    description: "A copy of another artist's work. It was made for practice.",
    canUpdateCommunityName: false,
    collection: "Frank's Fine Forms",
    src: "images/Magical_Rocks.jpg",
    resolution: {
      x: 2256,
      y: 2820,
    },
    tags: ["Krita", "Landscape"],
    createdAt: timestampAt("2020-8-29"),
  },
  {
    name: "Farsan",
    description:
      "This is a painting of an old photo of my dad who was a TV repair man at the time.",
    collection: "Frank's Fine Forms",
    canUpdateCommunityName: false,
    src: "images/Farsan.jpg",
    resolution: {
      x: 6000,
      y: 4000,
    },
    tags: ["Procreate", "Sweden", "Old School Cool"],
    createdAt: timestampAt("2021-8-28"),
  },
  {
    name: "Rising Bull",
    saleInfo: {
      price: adaToLovelace("100"),
      status: "Sold",
    },
    description: "A bull rising with the sun.",
    collection: "Frank's Fine Forms",
    canUpdateCommunityName: false,
    src: "images/Bull.jpg",
    resolution: {
      x: 2048,
      y: 2732,
    },
    tags: ["Bull", "Krita", "Animal"],
    createdAt: timestampAt("2021-5-1"),
  },
  {
    name: "Tiny Tsunami",
    description:
      "Yet again I'm taking a old piece of art and adding bananas to it. This time it is 'the great wave off kanagawa' by the Japanese ukiyo-e artist Hokusai.",
    collection: "Frank's Fine Forms",
    src: "images/Tiny_Tsunami.jpg",
    resolution: {
      x: 3859,
      y: 2594,
    },
    tags: ["Procreate", "Banana", "Japan"],
    createdAt: timestampAt("2021-9-17"),
    canUpdateCommunityName: false,
  },
  {
    name: "The Skier",
    description: "A painting of my dad skiing.",
    collection: "Frank's Fine Forms",
    src: "images/Dad_Skiing.jpg",
    resolution: {
      x: 6000,
      y: 4000,
    },
    tags: ["Procreate", "Winter", "Skiing"],
    createdAt: timestampAt("2021-6-19"),
    canUpdateCommunityName: false,
  },
  {
    name: "The Young Bull",
    description:
      "To celebrate the successfull launch and getting all my NFTs sold I gifted this NFT to one member of the community.",
    collection: "Frank's Fine Forms",
    src: "images/The_young_bull.jpg",
    resolution: {
      x: 6000,
      y: 4000,
    },
    saleInfo: {
      status: "Gift",
    },
    tags: ["Procreate", "Winter", "Skiing"],
    createdAt: timestampAt("2021-9-3"),
    canUpdateCommunityName: false,
  },
  {
    name: "Impotence",
    description:
      'Another piece in my series of "famous works but with bananas". This time it is "The Persistance of Memory" by Salvador Dali that gets the banana treatment.',
    collection: "Frank's Fine Forms",
    src: "images/Impotence.jpg",
    resolution: {
      x: 6000,
      y: 3374,
    },
    saleInfo: {
      price: adaToLovelace("200"),
      status: "Sold",
    },
    tags: ["Procreate", "Surrealism", "Banana"],
    createdAt: timestampAt("2021-8-21"),
    canUpdateCommunityName: false,
  },
  {
    name: "Fluffy Cloud",
    description:
      "Another unfinshed piece that painted on top of. Originally made in Krita but then modified in Procreate.",
    collection: "Frank's Fine Forms",
    src: "images/Fluffy_Cloud.jpg",
    resolution: {
      x: 1000,
      y: 1000,
    },
    saleInfo: {
      price: adaToLovelace("50"),
      status: "Sold",
    },
    tags: ["Krita", "Procreate", "Landscape", "Cloud"],
    createdAt: timestampAt("2021-8-11"),
    canUpdateCommunityName: false,
  },
  {
    name: "Orange Tree",
    description:
      "Found an unfinshed piece that I decided to finish. I had problem converying the perspective but managed to solve it by adding a boat.",
    collection: "Frank's Fine Forms",
    src: "images/Orange_Tree.jpg",
    resolution: {
      x: 1200,
      y: 1006,
    },
    saleInfo: {
      price: adaToLovelace("100"),
      status: "Sold",
    },
    tags: ["Krita", "Procreate", "Landscape", "Cloud"],
    createdAt: timestampAt("2021-8-10"),
    canUpdateCommunityName: false,
  },
  {
    name: "Self Portrait #0",
    description: "My first self portait.",
    collection: "Frank's Fine Forms",
    src: "images/Self_Portrait_0.jpg",
    resolution: {
      x: 4200,
      y: 3300,
    },
    tags: ["Krita", "Self Portrait"],
    createdAt: timestampAt("2021-8-10"),
    canUpdateCommunityName: false,
  },
  {
    name: "Boy",
    description: "A study in grey scale painting.",
    collection: "Frank's Fine Forms",
    src: "images/Grey_Boy.jpg",
    resolution: {
      x: 1600,
      y: 2140,
    },
    saleInfo: {
      price: adaToLovelace("100"),
      status: "Sold",
    },
    tags: ["Krita", "Portrait"],
    createdAt: timestampAt("2020-5-6"),
    canUpdateCommunityName: false,
  },
  {
    name: "Pomegranate",
    description: "A delicious pomegranate.",
    collection: "Frank's Fine Forms",
    src: "images/Pomegranate.jpg",
    resolution: {
      x: 1920,
      y: 1440,
    },
    saleInfo: {
      price: adaToLovelace("75"),
      status: "Sold",
    },
    tags: ["Krita", "Still Life", "Fruit"],
    createdAt: timestampAt("2019-10-13"),
    canUpdateCommunityName: false,
  },
  {
    name: "Winter Winds",
    description: "A few trees drowning in a snowstorm.",
    collection: "Frank's Fine Forms",
    src: "images/Winter_Winds.jpg",
    resolution: {
      x: 1600,
      y: 1200,
    },
    saleInfo: {
      price: adaToLovelace("30"),
      status: "Sold",
    },
    tags: ["Krita", "Winter"],
    createdAt: timestampAt("2018-5-4"),
    canUpdateCommunityName: false,
  },
  {
    name: "Where Is My Bull",
    description: "Where is my bull? Where is he?",
    collection: "Frank's Fine Forms",
    src: "images/Where_Is_My_Bull.jpg",
    resolution: {
      x: 6000,
      y: 4000,
    },
    saleInfo: {
      price: adaToLovelace("100"),
      status: "Sold",
    },
    tags: ["Procreate", "Animal", "Bull"],
    createdAt: timestampAt("2021-8-2"),
    canUpdateCommunityName: false,
  },
  {
    name: "Whaligoe Steps",
    description:
      "Whaligoe Steps in Scotland but with the colors creatively re-imagined.",
    collection: "Frank's Fine Forms",
    src: "images/Whaligoe_Steps.jpg",
    resolution: {
      x: 2560,
      y: 1440,
    },
    saleInfo: {
      price: adaToLovelace("150"),
      status: "Sold",
    },
    tags: ["Krita", "Ocean", "Landscape"],
    createdAt: timestampAt("2019-8-25"),
    canUpdateCommunityName: false,
  },

  {
    name: "Wave",
    description: "My first ever digital painting.",
    collection: "Frank's Fine Forms",
    src: "images/Wave.jpg",
    resolution: {
      x: 1800,
      y: 1200,
    },
    saleInfo: {
      price: adaToLovelace("50"),
      status: "Sold",
    },
    tags: ["Krita", "Ocean", "Landscape"],
    createdAt: timestampAt("2018-12-17"),
    canUpdateCommunityName: false,
  },
  {
    name: "Purple Women",
    description:
      "A copy of another artist's work. It was made for practice and was the first portrait I ever did on my ipad.",
    collection: "Frank's Fine Forms",
    src: "images/Purple_Woman.jpg",
    resolution: {
      x: 2048,
      y: 2732,
    },
    tags: ["Procreate", "Portrait", "Character", "Dishonored"],
    createdAt: timestampAt("2020-10-30"),
    canUpdateCommunityName: false,
  },
  {
    name: "Purple Flowers In The Jungle",
    description: "A jungle scene from my imagination.",
    collection: "Frank's Fine Forms",
    src: "images/Purple_Flowers_In_Jungle.jpg",
    resolution: {
      x: 1200,
      y: 1920,
    },
    saleInfo: {
      price: adaToLovelace("100"),
      status: "Sold",
    },
    tags: ["Krita", "Landscape", "Flowers", "Purple", "Green"],
    createdAt: timestampAt("2019-5-25"),
    canUpdateCommunityName: false,
  },
  {
    name: "Pumpkins",
    description: "A bunch of pumpkins in a field.",
    collection: "Frank's Fine Forms",
    src: "images/Pumpkins.jpg",
    resolution: {
      x: 1800,
      y: 1200,
    },
    saleInfo: {
      price: adaToLovelace("100"),
      status: "Sold",
    },
    tags: ["Krita", "Fruit", "Still Life"],
    createdAt: timestampAt("2019-8-10"),
    canUpdateCommunityName: false,
  },
  {
    name: "Volwerine",
    description: "A copy of another artist's work. It was made for practice.",
    collection: "Frank's Fine Forms",
    src: "images/Volwerine.jpg",
    resolution: {
      x: 2556,
      y: 2820,
    },
    tags: ["Krita", "Portrait", "Character"],
    createdAt: timestampAt("2020-8-20"),
    canUpdateCommunityName: false,
  },
  {
    name: "Priest",
    description: "A character made from imagination.",
    collection: "Frank's Fine Forms",
    src: "images/Priest.jpg",
    resolution: {
      x: 1724,
      y: 2400,
    },
    tags: ["Krita", "Portrait", "Character"],
    createdAt: timestampAt("2020-6-30"),
    canUpdateCommunityName: false,
  },
  {
    name: "Milk Man",
    description: "A milk man making a goofy face.",
    collection: "Frank's Fine Forms",
    src: "images/Milk_Man.jpg",
    resolution: {
      x: 3000,
      y: 4000,
    },
    tags: ["Krita", "Portrait", "Character"],
    createdAt: timestampAt("2021-1-28"),
    canUpdateCommunityName: false,
  },
  {
    name: "Golden Girl",
    description: "A copy of another artist's work. It was made for practice.",
    collection: "Frank's Fine Forms",
    src: "images/Golden_Girl.jpg",
    resolution: {
      x: 2000,
      y: 3786,
    },
    tags: ["Krita", "Portrait", "Character"],
    createdAt: timestampAt("2021-1-15"),
    canUpdateCommunityName: false,
  },
  {
    name: "A Frog",
    description: "A Frog.",
    collection: "Frank's Fine Forms",
    src: "images/Frog.jpg",
    saleInfo: {
      price: adaToLovelace("100"),
      status: "Sold",
    },
    resolution: {
      x: 2560,
      y: 1440,
    },
    tags: ["Krita", "Animal"],
    createdAt: timestampAt("2021-1-15"),
    canUpdateCommunityName: false,
  },
  {
    name: "Self Portrait #1",
    description: "A self portrait.",
    collection: "Frank's Fine Forms",
    src: "images/Self_Portrait_1.jpg",
    resolution: {
      x: 2208,
      y: 2944,
    },
    tags: ["Krita", "Portrait"],
    createdAt: timestampAt("2020-1-12"),
    canUpdateCommunityName: false,
  },
  {
    name: "Self Portrait #2",
    description: "A self portrait.",
    collection: "Frank's Fine Forms",
    src: "images/Self_Portrait_2.jpg",
    resolution: {
      x: 2920,
      y: 3644,
    },
    tags: ["Krita", "Portrait"],
    createdAt: timestampAt("2020-1-12"),
    canUpdateCommunityName: false,
  },
  {
    name: "Fire Woman",
    description: "A copy of another artist's work. It was made for practice.",
    collection: "Frank's Fine Forms",
    src: "images/firewomen.jpg",
    resolution: {
      x: 2048,
      y: 2732,
    },
    tags: ["Procreate", "Portrait", "Character"],
    createdAt: timestampAt("2020-12-30"),
    canUpdateCommunityName: false,
  },
  {
    name: "Eagle Landing",
    description: "A landscape made from imagination",
    collection: "Frank's Fine Forms",
    src: "images/Eagle_Landing.jpg",
    resolution: {
      x: 2732,
      y: 2048,
    },
    tags: ["Procreate", "Landscape"],
    createdAt: timestampAt("2021-3-2"),
    canUpdateCommunityName: false,
  },
  {
    name: "Abstract #1",
    description: "My first attempt at an abstract painting.",
    collection: "Frank's Fine Forms",
    src: "images/Color_Clouds.jpg",
    resolution: {
      x: 4000,
      y: 6000,
    },
    saleInfo: {
      price: adaToLovelace("100"),
      status: "Sold",
    },
    tags: ["Krita", "Clouds", "Procreate", "Abstract"],
    createdAt: timestampAt("2021-3-2"),
    canUpdateCommunityName: false,
  },
  {
    name: "Cliff and Ocean",
    description:
      "My first attempt at a landscape painting. It is made from Imagination.",
    collection: "Frank's Fine Forms",
    src: "images/Cliff_Ocean.jpg",
    resolution: {
      x: 1600,
      y: 1200,
    },
    saleInfo: {
      price: adaToLovelace("75"),
      status: "Sold",
    },
    tags: ["Ocean", "Krita", "Landscape"],
    createdAt: timestampAt("2018-1-5"),
    canUpdateCommunityName: false,
  },
  {
    name: "Canyon River",
    description:
      "This is a copy of another artist's work. It was done for practice.",
    collection: "Frank's Fine Forms",
    src: "images/Canyon_River.jpg",
    resolution: {
      x: 1200,
      y: 1920,
    },
    saleInfo: {
      price: adaToLovelace("75"),
      status: "Sold",
    },
    tags: ["Derivative", "Krita", "Landscape"],
    createdAt: timestampAt("2019-5-5"),
    canUpdateCommunityName: false,
  },
  {
    name: "Sketch Of A Boy",
    description: "A Simple sketch I did.",
    collection: "Frank's Fine Forms",
    src: "images/Sketch_Of_A_Boy.jpg",
    resolution: {
      x: 2048,
      y: 2732,
    },
    saleInfo: {
      price: adaToLovelace("50"),
      status: "Sold",
    },
    tags: ["Derivative", "Krita", "Landscape"],
    createdAt: timestampAt("2020-12-1"),
    canUpdateCommunityName: false,
  },
  {
    name: "Japan",
    description:
      "The Japanese flag re-imagined. It takes heavy inspiration from tattoo which I thought looked a lot like the flag of Japan.",
    collection: "Frank's Fine Forms",
    src: "images/Japan_Remade.jpg",
    resolution: {
      x: 6000,
      y: 4000,
    },
    saleInfo: {
      price: adaToLovelace("100"),
      status: "Sold",
    },
    tags: ["Re-imagined Flags", "Procreate"],
    createdAt: timestampAt("2021-8-7"),
    canUpdateCommunityName: false,
  },
  {
    name: "Europe",
    description: "The European flag re-imagined.",
    collection: "Frank's Fine Forms",
    src: "images/European_Flowers.jpg",
    resolution: {
      x: 6000,
      y: 4000,
    },
    saleInfo: {
      price: adaToLovelace("50"),
      status: "Sold",
    },
    tags: ["Re-imagined Flags", "Procreate"],
    createdAt: timestampAt("2021-8-8"),
    canUpdateCommunityName: false,
  },
  {
    name: "This Is Not A Banana",
    description:
      'A banana version of "The Trechery Of Images" by René Magritte.',
    collection: "Frank's Fine Forms",
    src: "images/This_Is_Not_A_Banana.jpg",
    resolution: {
      x: 5500,
      y: 4000,
    },
    saleInfo: {
      price: adaToLovelace("100"),
      status: "Sold",
    },
    tags: ["Procreate", "Banana", "Surrealism"],
    createdAt: timestampAt("2020-9-4"),
    canUpdateCommunityName: false,
  },
];
