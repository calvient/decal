import React from 'react';
import {Box, BoxProps} from '@chakra-ui/react';

interface Props extends BoxProps {
  children: React.ReactNode;
}

const GlassPanel = ({children, ...props}: Props) => (
  <Box
    p={8}
    bgColor='rgba(255, 255, 255, 0.52);'
    boxShadow='md'
    borderRadius='xl'
    backdropFilter='blur(12px)'
    {...props}
  >
    {children}
  </Box>
);

export default GlassPanel;
