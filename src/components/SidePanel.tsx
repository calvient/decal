import React from 'react';
import {Box, BoxProps, Fade, Heading, IconButton, Portal, Slide} from '@chakra-ui/react';
import {MdClose} from 'react-icons/md';

interface SidePanelProps extends BoxProps {
  children: React.ReactNode;
  title: string;
  isOpen: boolean;
  onClose: () => void;
  size?: 'full' | 'partial';
}

const SidePanel = ({
  children,
  title,
  size = 'partial',
  isOpen,
  onClose,
  ...rest
}: SidePanelProps) => (
  <Portal>
    <Fade in={isOpen} unmountOnExit>
      <Box pos='fixed' top={0} left={0} w='100%' h='100%' bg='rgba(0,0,0,0.2)' />
    </Fade>
    <Slide direction='right' in={isOpen} style={{zIndex: 'sticky'}} unmountOnExit>
      <Box
        zIndex='sticky'
        pos='fixed'
        right={0}
        top={0}
        bottom={0}
        w={size === 'full' ? '100%' : {base: '90%', md: '65%', lg: '40%'}}
        bgColor='white'
        boxShadow='md'
        p={4}
        overflowY='auto'
        {...rest}
      >
        <Heading w='full' size='md' textAlign='left'>
          {title}
          <IconButton
            aria-label='close'
            icon={<MdClose />}
            variant='ghost'
            float='right'
            onClick={onClose}
          />
        </Heading>
        <Box w='full' mt={4}>
          {children}
        </Box>
      </Box>
    </Slide>
  </Portal>
);

export default SidePanel;
