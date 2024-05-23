import React from 'react';
import ReactDOM from 'react-dom/client';
import {Box, ChakraProvider, HStack, ChevronRightIcon} from '../index';
import theme from '../theme/theme';
import PuddleFormScreen from './screens/PuddleFormScreen';
import {Button} from '@chakra-ui/react';
import EmptyState from '../components/EmptyState';
import {alert} from '../components/Alert';
import {confirm} from '../components/Confirm';
import {prompt} from '../components/Prompt';

const App = () => {
  const [currentScreen, setCurrentScreen] = React.useState(0);

  const screens = [
    {title: 'PuddleForm', component: <PuddleFormScreen />},
    {
      title: 'Alert',
      component: (
        <HStack spacing={4} pt={4}>
          <Button
            onClick={() =>
              alert({
                title: 'Hello',
                content: 'This is a test',
                onDestroy: () => console.log('Destroyed'),
              })
            }
          >
            Alert me
          </Button>
          <Button
            onClick={() =>
              confirm({
                title: 'Hello',
                content: 'This is a test',
                onOk: () => console.log('Confirmed'),
                onDestroy: () => console.log('Destroyed'),
              })
            }
          >
            Confirm me
          </Button>
          <Button
            onClick={() =>
              prompt({
                title: 'Hello',
                initialValue: 'This is a test',
                onConfirm: (value) => console.log('Prompted', value),
                onDestroy: () => console.log('Destroyed'),
              })
            }
          >
            Prompt me
          </Button>
        </HStack>
      ),
    },
    {
      title: 'Empty State',
      component: (
        <EmptyState
          src={'https://source.unsplash.com/SHcHVFhz7-M/1600x900'}
          message={'Nothing to see here'}
        />
      ),
    },
  ];

  return (
    <HStack w={'full'} alignItems={'stretch'} spacing={4} h={'100vh'}>
      <Box w={'220px'} bgColor={'gray.100'}>
        {screens.map((screen, index) => (
          <Button
            key={index}
            w={'full'}
            variant={'ghost'}
            justifyContent={'flex-start'}
            leftIcon={index === currentScreen ? <ChevronRightIcon /> : undefined}
            colorScheme={index === currentScreen ? 'blue' : 'gray'}
            onClick={() => setCurrentScreen(index)}
          >
            <Box textAlign='left'>{screen.title}</Box>
          </Button>
        ))}
      </Box>
      <Box flex={1}>{screens[currentScreen].component}</Box>
    </HStack>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>
);
