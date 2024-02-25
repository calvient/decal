import React from 'react';
import {Box, BoxProps} from '@chakra-ui/react';

interface MobilePageProps extends BoxProps {
  children: React.ReactNode;
}

const MobilePage = ({children, ...rest}: MobilePageProps) => (
  <Box pos='fixed' top={0} right={0} left={0} bottom={0} bgPos='center' bgSize='cover' {...rest}>
    <Box
      bgGradient='linear(to-b, primary.400, primary.700)'
      pos='fixed'
      top={0}
      right={0}
      left={0}
      bottom={0}
      overflow='scroll'
    >
      {children}
    </Box>
  </Box>
);

export default MobilePage;
