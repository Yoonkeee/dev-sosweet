import { Flex, Image, Spinner, Text } from '@chakra-ui/react';
import { Suspense } from 'react';

type Props = {
  path: string | null;
  w?: string;
};

export const ProductImage = ({ path, w }: Props) => (
  <Suspense fallback={<ProductImageSpinner />}>
    <Element path={path} w={w} />
  </Suspense>
);

const ProductImageSpinner = () => (
  <Flex alignItems="center" aspectRatio={1} h="90%" justifyContent="center" maxH="100px" minH="60px" ml="2%">
    <Spinner
      color="#1a2a52"
      emptyColor="gray.200"
      h="100%"
      rounded="full"
      speed="1s"
      thickness="4px"
      w="100%"
    />
  </Flex>
);

const Element = ({ path, w }: Props) => (
  <Flex
    alignContent="center"
    aspectRatio={1}
    h="90%"
    justifyContent="center"
    maxH="100px"
    minH="60px"
    ml="2%"
    w={w}
  >
    {path ? (
      <Image
        alignContent="center"
        aspectRatio={1}
        bgColor="transparent"
        border="3px lightgray solid"
        cursor="pointer"
        display="flex"
        h="100%"
        m={0}
        maxH="100px"
        minH="60px"
        onClick={e => {
          e.stopPropagation();
          console.log('이미지 썸네일');
        }}
        rounded="full"
        w="100%"
      />
    ) : (
      <Flex
        alignContent="center"
        alignItems="center"
        aspectRatio={1}
        bgColor="transparent"
        border="3px lightgray solid"
        cursor="pointer"
        display="flex"
        h="100%"
        justifyContent="center"
        m={0}
        maxH="100px"
        minH="60px"
        onClick={e => {
          e.stopPropagation();
        }}
        rounded="full"
        w="100%"
      >
        <Text fontSize="xx-large">🦴</Text>
      </Flex>
    )}
    {/* 이미지 모달 */}
  </Flex>
);
