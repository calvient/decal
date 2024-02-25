// @ts-expect-error TS6133: React is declared but its value is never read.
import React, {Component, ReactNode} from 'react';
import {Box, Button, Center, Heading, Text} from '@chakra-ui/react';
import * as Sentry from '@sentry/react';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  showError: boolean;
  error: Error | undefined;
}

class ErrorBoundary extends Component<Props, State> {
  public constructor(props: Props) {
    super(props);

    this.state = {
      hasError: false,
      showError: false,
      error: undefined,
    };
  }

  public static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI.
    return {hasError: true, error, showError: false};
  }

  public componentDidCatch(error: Error) {
    Sentry.captureException(error);
  }

  public render(): ReactNode {
    const {hasError, error, showError} = this.state;
    const {children} = this.props;

    if (hasError) {
      return (
        <Center p={16}>
          <Box borderRadius='lg' border='solid 1px' borderColor='gray.200' w='600px'>
            <Box bgColor='pink.100' px={8} py={4}>
              <Heading as='h1' size='md' color='pink.700'>
                Oops! Something went wrong.
              </Heading>
            </Box>

            <Box p={8}>
              {error?.name && (
                <Heading as='h2' size='md'>
                  An error has occurred. We apologize for this inconvenience and are looking into it
                  now.
                </Heading>
              )}

              <Box py={8}>
                {error?.name && <Text>{error.name}</Text>}
                {error?.message && <Text>{error.message}</Text>}

                {showError && (
                  <Box>
                    <Text>Stack trace:</Text>
                    <Text color='gray.500' size='xs'>
                      {error?.stack}
                    </Text>
                  </Box>
                )}
              </Box>

              <Box>
                <Button colorScheme='blue' onClick={() => window.location.reload()}>
                  Try Again
                </Button>
                <Button
                  variant='ghost'
                  ml={2}
                  onClick={() => this.setState({showError: !showError})}
                >
                  {showError ? 'Hide' : 'Show Full Error'}
                </Button>
              </Box>
            </Box>
          </Box>
        </Center>
      );
    }

    return children;
  }
}

export default ErrorBoundary;
