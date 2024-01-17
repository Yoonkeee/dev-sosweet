import { HStack, VStack } from '@chakra-ui/react';

export const ListContainer = ({ children }) => (
  <VStack bgColor="white" minH="80vh" pb="2vh" position="relative" w="100%">
    {children}
  </VStack>
);

export const ListElement = ({ bgColor = '#ffffff', children, height = '4.5rem', onClick = null }) => (
  <HStack
    bgColor={bgColor}
    border="1px gray solid"
    borderRadius="10px"
    cursor={onClick ? 'pointer' : 'default'}
    gap={0}
    h={height}
    maxH="100px"
    minH="76px"
    onClick={onClick}
    px="1%"
    textAlign="center"
    w="96%"
  >
    {children}
  </HStack>
);

ListContainer.Element = ListElement;
