import { createtheme } from "@lightbase/rn-design-system";

import { fontConfig } from "./theme.typography";

declare module "@lightbase/rn-design-system" {
  export interface LBCustomConfig extends CustomTheme {}
}

const colors = {
  error: "#D33F3F",
  success: "#2D9B5F",
  white: "#FFFFFF",
  black: "#000000",
  blue: "#0000FF",
  gray: "#808080",
  lightGray: "#D3D3D3",
};

export type CustomTheme = typeof customTheme;
export const customTheme = createtheme({
  colors: {
    light: {
      white: colors.white,
      black: colors.black,
      error: colors.error,
      success: colors.success,
      "text-base": colors.white,
      "button-primary": colors.blue,
      "canvas-base": colors.lightGray,
    },
    dark: {},
  },
  spacing: {
    "0px": 0,
    "5px": 5,
    "10px": 10,
    "15px": 15,
    "20px": 20,
    "24px": 24,
    "32px": 32,
    "40px": 40,
    "60px": 60,
  },
  radius: {
    "0px": 0,
    "4px": 4,
    "12px": 12,
    "16px": 16,
    "20px": 20,
    input: 12,
    card: 40,
    button: 78,
    full: 9999,
  },
  typography: {
    fonts: fontConfig,
    sizes: {
      "24px": { fontSize: 24, lineHeight: 28 },
      "17px": { fontSize: 17, lineHeight: 24 },
      "14px": { fontSize: 14, lineHeight: 17 },
      "12px": { fontSize: 12, lineHeight: 16 },
    },
  },
  defaults: {
    Button: {
      variant: "solid",
      themeColor: "button-primary",
      borderRadius: "button",
      paddingHorizontal: "20px",
      height: 56,
      textVariant: "button",
    },
    Text: {
      variant: "body",
    },
    Screen: {
      paddingHorizontal: "32px",
      paddingVertical: "24px",
      backgroundColor: "canvas-base",
    },
  },
  variants: {
    Text: {
      header: { size: "24px", family: "Roboto", weight: "bold", color: "white" },
      body: { size: "17px", family: "Roboto", weight: "regular", color: "text-base" },
      small: { size: "14px", family: "Roboto", weight: "regular", color: "text-base" },
      caption: { size: "12px", family: "Roboto", weight: "regular", color: "text-base" },
      button: { size: "24px", family: "Roboto", weight: "bold", color: "black" },
    },
    Button: {
      link: { paddingVertical: "5px", textVariant: "body", backgroundColor: { custom: "transparent" } },
      icon: { width: 30, height: 30, borderRadius: "full" },
    },
  },
});
