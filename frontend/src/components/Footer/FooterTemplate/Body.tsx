import { Flex, HStack } from '@chakra-ui/react';
import type { PropsWithChildren } from 'react';
import { mainColor } from '../../../api';

export const FooterBody = ({ children }: PropsWithChildren) => (
  <Flex
    alignContent="center"
    bgColor="#ffffff"
    borderTop={`3px solid ${mainColor}`}
    bottom={0}
    h="10vh"
    justifyContent="center"
    position="fixed"
    px="auto"
    w="100%"
    zIndex={3}
  >
    <HStack
      alignContent="center"
      alignItems="flex-start"
      bgColor="#ffffff"
      borderTop={`3px solid ${mainColor}`}
      bottom={0}
      display="flex"
      h="10vh"
      justifyContent="space-between"
      maxW="700px"
      paddingTop="0.2vh"
      position="fixed"
      px="min(8vw, 56px)"
      w="100%"
      zIndex={5}
    >
      {children}
    </HStack>
  </Flex>
);
