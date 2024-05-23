'use client';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import React, { ReactNode } from 'react';

const theme = extendTheme({
  components: {},
  colors: {
    primary: '#BA704F',
    putih: '#FFFCFB',
  },
  borders: {
    primary: `1px solid #BA704F`,
    putih: `1px solid #FFFCFB`,
  },
});
interface CustomChakraProps {
  children: ReactNode;
}

const Providers: React.FC<CustomChakraProps> = ({ children }) => {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
};

export default Providers;
