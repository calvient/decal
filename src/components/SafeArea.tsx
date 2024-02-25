import {Box, useBreakpointValue} from '@chakra-ui/react';

export default function SafeArea() {
  const isMobile = useBreakpointValue({
    base: true,
    md: false,
  });

  if (!isMobile) return null;

  return <Box minH='38px' w='full' bgColor='brand.400' />;
}
