import React from 'react';
import {Box, BoxProps, HStack} from '@chakra-ui/react';

const PartitionOverColumns = ({
  children,
  childrenPerColumn = 10,
  containerProps = {},
  columnProps = {},
}: {
  children: React.ReactNode[];
  childrenPerColumn?: number;
  containerProps?: BoxProps;
  columnProps?: BoxProps;
}) => {
  const columns = Math.ceil(children.length / childrenPerColumn);

  return (
    <HStack w='full' alignItems='flex-start' {...containerProps}>
      {[...Array(columns)].map((_, i) => (
        <Box key={i} {...columnProps}>
          {children.map((child, j) => {
            if (j >= i * childrenPerColumn && j < (i + 1) * childrenPerColumn) {
              return child;
            }
            return null;
          })}
        </Box>
      ))}
    </HStack>
  );
};

export default PartitionOverColumns;
