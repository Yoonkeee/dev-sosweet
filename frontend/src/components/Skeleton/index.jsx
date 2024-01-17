import { HStack, Skeleton, Spinner, VStack } from '@chakra-ui/react';

export const SkeletonContainer = () => (
  <VStack bgColor="white" minH="80vh" position="relative" py="2vh" w="100%">
    <SkeletonElement />
    <SkeletonElement />
    <SkeletonElement />
    <SkeletonElement />
    <SkeletonElement />
    <SkeletonElement />
    <SkeletonElement />
    <SkeletonElement />
    <SkeletonElement />
    <SkeletonElement />
    <SkeletonElement />
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
    <Spinner color="#1a2a52" emptyColor="gray.200" size="xl" speed="1s" thickness="4px" />
    <Skeleton h="80%" w="80%" />
  </HStack>
);
