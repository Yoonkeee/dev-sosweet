import { ChakraProvider, extendTheme } from '@chakra-ui/react';

const fontConfig = {
  fontVariantNumeric: 'tabularNums',
};

const theme = extendTheme(fontConfig);

export const UIProvider = ({ children }) => (
  <ChakraProvider resetCSS theme={theme}>
    {children}
  </ChakraProvider>
);
