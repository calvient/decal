import React, {FC} from 'react';
import {ChakraProvider} from '@chakra-ui/react';
import theme from '../theme/theme';
import ErrorBoundary from './ErrorBoundary';

const Page: FC<{children: React.ReactNode}> = ({children}) => (
  <ChakraProvider theme={theme}>
    <ErrorBoundary>{children}</ErrorBoundary>
  </ChakraProvider>
);

export default Page;
