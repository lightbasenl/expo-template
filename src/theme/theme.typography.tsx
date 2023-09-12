// This file is codegenerated as part of the link-assets expo config plugin
type FontWeightsArray = { Roboto: [700, 400, 300, 500, 100] };
export type FontWeights = {
  [K in keyof FontWeightsArray]: `${FontWeightsArray[K][number]}`;
};
export const fontConfig = {
  Roboto: {
    descent: -500,
    ascent: 1900,
    lineGap: 0,
    capHeight: 1456,
    unitsPerEm: 2048,
  },
};
