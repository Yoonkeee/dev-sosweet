import { Flex, HStack, Skeleton, Spinner, VStack } from '@chakra-ui/react';

export const SkeletonContainer = ({ amount = 10 }) => (
  <VStack bgColor="white" minH="80vh" position="relative" py="2vh" w="100%">
    {amount && [...Array(amount)].map((_, i) => <SkeletonElement key={`skeleton-${i}`} />)}
  </VStack>
);

const SkeletonElement = () => (
  <HStack
    border="1px gray solid"
    borderRadius="10px"
    gap={0}
    h="4.5rem"
    justifyContent="space-around"
    maxH="100px"
    minH="76px"
    px="1%"
    textAlign="center"
    w="96%"
  >
    <Flex
      alignItems="center"
      aspectRatio={1}
      h="90%"
      justifyContent="center"
      maxH="100px"
      minH="60px"
      ml="2%"
    >
      <Spinner
        color="#1a2a52"
        emptyColor="gray.200"
        h="100%"
        rounded="full"
        size="xl"
        speed="1s"
        thickness="4px"
        w="100%"
      />
    </Flex>
    <Skeleton h="80%" w="80%" />
  </HStack>
);
