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

export type ConfirmProps = {
  title: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'xs' | '3xl' | '4xl' | '5xl' | '6xl' | 'full';
  content?: React.ReactNode | React.ReactNode[];
  onOk: () => Promise<void> | void;
  onDestroy?: () => void;
};

const Modal: React.FC<ConfirmProps> = ({title, size = 'sm', content = '', onOk, onDestroy}) => {
  const [isOpen, setIsOpen] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const cancelRef = useRef(null);

  const closeModal = () => {
    setIsOpen(false);
    if (onDestroy) setTimeout(onDestroy, 500);
  };

  const confirmModal = async () => {
    setIsSubmitting(true);
    await onOk();
    setIsSubmitting(false);
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

            <AlertDialogBody>{content}</AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={closeModal} isDisabled={isSubmitting}>
                Cancel
              </Button>
              <Button colorScheme='red' onClick={confirmModal} ml={3} isLoading={isSubmitting}>
                OK
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export const confirm = (props: ConfirmProps) => {
  const domNode = document.getElementById('confirm-modal-div') || document.createElement('div');
  const root = createRoot(domNode);

  if (domNode.id !== 'confirm-modal-div') {
    domNode.id = 'confirm-modal-div';
    document.body.appendChild(domNode);
  }

  const onDestroy = () => {
    root.unmount();
  };

  // eslint-disable-next-line react/no-render-return-value
  return root.render(
    <ChakraProvider theme={theme}>
      <Modal {...props} onDestroy={onDestroy} />
    </ChakraProvider>
  );
};
