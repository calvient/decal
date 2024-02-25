import {FC} from 'react';
import {Box, Heading, Image} from '@chakra-ui/react';

interface EmptyStateProps {
  src: string;
  message: string;
}

const EmptyState: FC<EmptyStateProps> = ({src, message}) => (
  <Box
    h='full'
    flex='1'
    display='flex'
    justifyContent='center'
    alignItems='center'
    flexDirection='column'
  >
    <Box>
      <Image opacity='.7' maxW='380px' src={src} mx='auto' />
    </Box>
    <Box mt='8'>
      <Heading color='gray.500' size='md' p={8}>
        {message}
      </Heading>
    </Box>
  </Box>
);

export default EmptyState;
