import { Artwork } from "../src/Types/Artwork";
import { adaToLovelace, timestampAt, TokenID } from "./Helpers";

/**
 *
 * @param artwork the artwork
 * @returns
 */
export function possibleTokenID(artwork: Artwork): TokenID {
  return {
    policyID: "8236e14a07850dec626f69977da8700297a575ded7c5f26c957be731",
    tokenName: "FHW" + artwork.name.replace(/[^0-9a-zA-Z]/gi, ""),
  };
}

export function stainedGlass(): Artwork[] {
  return stainedGlassNames.map((name) => {
    const tmp: Artwork = {
      name: name,
      canUpdateCommunityName: true,
      collection: "Stained Glass",
      saleInfo: {
        price: adaToLovelace("25"),
        status: "Sold",
      },
      src: `images/${name}.svg`,
      createdAt: timestampAt("2021-8-13"),
      tags: ["Generative", "Stained Glass", "Triangles"],
    };
    const communityName = stainedGlassCommunityName(name);
    if (communityName) {
      tmp.communityName = communityName;
    }

    return tmp;
  });
}

function stainedGlassCommunityName(name: string): string | undefined {
  switch (name) {
    case "93700844":
      return "Genesis";

    case "73521339":
      return "Dawn of Light";

    case "91167350":
      return "King of Arkham";

    case "98763993":
      return "Tangerine Dream";

    case "88050797":
      return "Vaccine";

    case "50174834":
      return "Emerald";

    case "78653823":
      return "Crystal Meth";

    case "97309529":
      return "stained_unsig00661";

    case "89813951":
      return "Wings";

    case "20063884":
      return "Eggs over Mauve";

    case "28684357":
      return "Lavender Haze";

    case "81975302":
      return "Strat Blue Burst";

    case "24489465":
      return "The Big Picture";

    case "52415956":
      return "Turkish Delight";
  }
  return undefined;
}

const stainedGlassNames = [
  "00456830",
  "00534964",
  "03851774",
  "07532852",
  "08247708",
  "08294677",
  "08523360",
  "09453704",
  "09901327",
  "10480308",
  "12333805",
  "13582759",
  "14166929",
  "14381240",
  "15315881",
  "15925273",
  "16158626",
  "16720912",
  "16882072",
  "17721837",
  "19082677",
  "19137925",
  "19762503",
  "20063884",
  "20303503",
  "22764432",
  "24489465",
  "26909933",
  "28684357",
  "29881793",
  "31076848",
  "32756390",
  "34648215",
  "36738089",
  "39299120",
  "39539625",
  "40818528",
  "40915924",
  "43718143",
  "44139434",
  "44266196",
  "44315178",
  "45099050",
  "45148072",
  "45706685",
  "46521515",
  "48842927",
  "49286484",
  "49515637",
  "50174834",
  "51959128",
  "52098493",
  "52162153",
  "52332483",
  "52415956",
  "54986188",
  "56061724",
  "57498966",
  "63808790",
  "64189713",
  "64196293",
  "64974370",
  "68652572",
  "71169845",
  "73485237",
  "73521339",
  "74257847",
  "74284065",
  "75791387",
  "78653823",
  "79656571",
  "80403573",
  "81042545",
  "81376648",
  "81975302",
  "82735458",
  "83076266",
  "83347279",
  "83420429",
  "85843737",
  "86963292",
  "87394256",
  "87759780",
  "88050797",
  "88111512",
  "89813951",
  "90533424",
  "91167350",
  "93160699",
  "93700844",
  "94463622",
  "95213307",
  "95783722",
  "96297881",
  "97047055",
  "97309529",
  "97932002",
  "98212139",
  "98763993",
  "99270561",
];
