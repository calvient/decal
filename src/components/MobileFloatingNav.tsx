import React, {FC} from 'react';
import {
  Box,
  Button,
  ButtonProps,
  Heading,
  HStack,
  IconButton,
  Portal,
  useDisclosure,
} from '@chakra-ui/react';
import {MdClose, MdNorthWest} from 'react-icons/md';

interface MobileFloatingNavProps extends ButtonProps {
  children: React.ReactNode | React.ReactNode[];
  title: string;
}

const MobileFloatingNav: FC<MobileFloatingNavProps> = ({children, title, ...rest}) => {
  const {isOpen, onToggle} = useDisclosure();

  return (
    <Portal>
      <Button
        display={!isOpen ? {base: 'block', md: 'none'} : 'none'}
        borderRadius='lg'
        boxShadow='lg'
        size='sm'
        colorScheme='primary'
        color='white'
        leftIcon={<MdNorthWest />}
        pos='fixed'
        bottom={4}
        right={4}
        px={4}
        py={2}
        {...rest}
        onClick={onToggle}
      >
        Show {title}
      </Button>
      <Box
        pos='fixed'
        bottom={isOpen ? 0 : '-100%'}
        left={0}
        right={0}
        p={0}
        m={0}
        overflow='auto'
        transition='all .3s'
      >
        <Box
          bgColor='primary.700'
          mx='auto'
          my={0}
          w={{base: '100%', sm: '60%'}}
          p={4}
          borderTopRadius='xl'
          boxShadow='xl'
        >
          <HStack w='full' justifyContent='space-between'>
            <Heading size='md' color='white'>
              {title}
            </Heading>
            <IconButton
              aria-label='Close'
              icon={<MdClose />}
              onClick={onToggle}
              colorScheme='white'
              ml='auto'
            >
              Close
            </IconButton>
          </HStack>
          {children}
        </Box>
      </Box>
    </Portal>
  );
};

export default MobileFloatingNav;
