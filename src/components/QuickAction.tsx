import {FC} from 'react';
import {Box, BoxProps, Text, Icon, Tooltip} from '@chakra-ui/react';

interface QuickActionProps extends BoxProps {
  color: string;
  isAvailable: boolean;
  whyNotAvailable: string;
  icon: any;
  text: string;
  onClick?: () => void;
}

const QuickAction: FC<QuickActionProps> = ({
  color,
  isAvailable,
  whyNotAvailable,
  icon,
  text,
  onClick = () => {},
  ...boxProps
}) => {
  const getColor = () => {
    if (!isAvailable) return 'gray';
    return color;
  };

  return (
    <Tooltip key={text} label={isAvailable ? '' : whyNotAvailable}>
      <Box
        role='button'
        color={isAvailable ? 'white' : 'gray.400'}
        bgGradient={`linear(to-br, ${getColor()}.400, ${getColor()}.600)`}
        p={2}
        h='80px'
        w='86px'
        borderRadius='lg'
        textAlign='center'
        _hover={
          isAvailable
            ? {
                bgGradient: `linear(to-br, ${getColor()}.300, ${getColor()}.600)`,
                boxShadow: 'lg',
              }
            : {
                cursor: 'not-allowed',
              }
        }
        onClick={isAvailable ? onClick : undefined}
        {...boxProps}
      >
        <Icon as={icon} boxSize='6' />
        <Text fontSize='xs'>{text}</Text>
      </Box>
    </Tooltip>
  );
};

export default QuickAction;
