import * as yup from "yup";

////////////////////////////////////////////////////////////////////////////////
// ArtCounter
////////////////////////////////////////////////////////////////////////////////

export type ArtCounter = {
  total: number;
  available: number;
  reserved: number;
  expired: number;
  sold: number;
  notForSale: number;
  error: number;
};

const nonNegativeNumber = yup
  .number()
  .required("ERROR: The number is required!")
  .test(
    "Is non-negative?",
    "ERROR: The number must be greater or equal to 0",
    (value) => value >= 0
  );

export const artCounterSchema: yup.ObjectSchema<ArtCounter> = yup.object({
  total: nonNegativeNumber,
  available: nonNegativeNumber,
  reserved: nonNegativeNumber,
  expired: nonNegativeNumber,
  sold: nonNegativeNumber,
  notForSale: nonNegativeNumber,
  error: nonNegativeNumber,
});

export function artCounterInit(): ArtCounter {
  return {
    total: 0,
    available: 0,
    reserved: 0,
    expired: 0,
    sold: 0,
    notForSale: 0,
    error: 0,
  };
}

export function eq(l: ArtCounter, r: ArtCounter): boolean {
  return (
    l.available === r.available &&
    l.error === r.error &&
    l.notForSale === r.notForSale &&
    l.reserved === r.reserved &&
    l.expired === r.expired &&
    l.sold === r.sold &&
    l.total === r.total
  );
}
