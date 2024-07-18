import { Flex, Image, Spinner, Text } from '@chakra-ui/react';
import { Suspense } from 'react';

type Props = {
  path: string | null;
  w?: string;
};

export const ProductImage = ({ path, w }: Props) => (
  <Suspense fallback={<ProductImageSpinner />}>
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
      <ImageOrPlaceholder path={path} />
      {/* TODO: 썸네일 클릭 이벤트에 따라 모달 연결 */}
    </Flex>
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

const ImageOrPlaceholder = ({ path }: { path: string | null }) =>
  path ? (
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
        // TODO: 이미지 썸네일 모달 연결
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
      rounded="full"
      w="100%"
    >
      <Text fontSize="xx-large">🦴</Text>
    </Flex>
  );
