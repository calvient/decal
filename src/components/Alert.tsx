import React, {useRef, useState} from 'react';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  ChakraProvider,
} from '@chakra-ui/react';
import {createRoot} from 'react-dom/client';
import theme from '../theme/theme';

export type DecalAlertProps = {
  title: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'xs' | '3xl' | '4xl' | '5xl' | '6xl' | 'full';
  content?: React.ReactNode | React.ReactNode[];
  onDestroy?: () => void;
};

const Modal: React.FC<DecalAlertProps> = ({title, size = 'sm', content = '', onDestroy}) => {
  const [isOpen, setIsOpen] = useState(true);
  const cancelRef = useRef(null);

  const closeModal = () => {
    setIsOpen(false);
    if (onDestroy) setTimeout(onDestroy, 500);
  };

  return (
    <>
      <AlertDialog size={size} isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={closeModal}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              {title}
            </AlertDialogHeader>

            <AlertDialogBody>{content}</AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={closeModal}>
                Cancel
              </Button>
              <Button colorScheme='red' onClick={closeModal} ml={3}>
                OK
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export const alert = (props: DecalAlertProps) => {
  const domNode = document.getElementById('alert-modal-div') || document.createElement('div');
  const root = createRoot(domNode);

  if (domNode.id !== 'alert-modal-div') {
    domNode.id = 'alert-modal-div';
    document.body.appendChild(domNode);
  }

  const onDestroy = () => {
    root.unmount();
  };

  return root.render(
    <ChakraProvider theme={theme}>
      <Modal {...props} onDestroy={onDestroy} />
    </ChakraProvider>
  );
};
