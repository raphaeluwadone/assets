// 1. Import `extendTheme`
import { extendTheme } from "@chakra-ui/react";

// 2. Call `extendTheme` and pass your custom values
const theme = extendTheme({
  colors: {
    brandGrey: {
      100: "#F2F2F2",
      200: "#F9F9F9",
      300: "#848484",
      400: "#EAEAEA",
      500: "#F4F4F4",
      600: "#A0A0A0"
    },
    brandRed: {
      100: "#E1003A",
      200: "#b6002d",
    },
  },
  fonts: {
    heading: `'Inter', sans-serif`,
    body: `'Inter', sans-serif`,
  },
});

export default theme;
