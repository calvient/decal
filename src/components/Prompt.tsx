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
  Input,
} from '@chakra-ui/react';
import {createRoot} from 'react-dom/client';
import theme from '../theme/theme';

export type PromptProps = {
  title: string;
  initialValue?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'xs' | '3xl' | '4xl' | '5xl' | '6xl' | 'full';
  onConfirm: (value: string) => void;
  onDestroy?: () => void;
};

const Modal: React.FC<PromptProps> = ({
  title,
  initialValue = '',
  size = 'sm',
  onConfirm,
  onDestroy,
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const [value, setValue] = useState(initialValue);
  const cancelRef = useRef(null);

  const closeModal = () => {
    setIsOpen(false);
    if (onDestroy) setTimeout(onDestroy, 500);
  };

  const confirmModal = () => {
    onConfirm(value);
    setTimeout(closeModal, 500);
  };

  return (
    <>
      <AlertDialog size={size} isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={closeModal}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              {title}
            </AlertDialogHeader>

            <AlertDialogBody>
              <Input
                placeholder='Enter a value'
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={closeModal}>
                Cancel
              </Button>
              <Button colorScheme='red' onClick={confirmModal} ml={3}>
                OK
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export const prompt = (props: PromptProps) => {
  const domNode = document.getElementById('prompt-modal-div') || document.createElement('div');
  const root = createRoot(domNode);

  if (domNode.id !== 'prompt-modal-div') {
    domNode.id = 'prompt-modal-div';
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
