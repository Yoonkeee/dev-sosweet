import { Flex, HStack, Text } from '@chakra-ui/react';
import { useSuspenseQuery } from '@tanstack/react-query';
import type { ProductWithSalesRecord } from 'src/types/dto';
import { getHeaderTopPosition } from '../api';
import { ListContainer, ListElement } from '../components/List';
import ProductRow from '../components/Rows/ProductRow';
import { getProductList } from '../mockApi';

export const Product = () => {
  const productList = useSuspenseQuery({
    queryKey: ['product-list'],
    queryFn: getProductList,
  }).data;
  return (
    <ListContainer>
      <Header />
      <ProductList productList={productList} />
    </ListContainer>
  );
};

const Header = () => (
  <Flex
    bgColor="white"
    borderBottom="5px #1a2a52 solid"
    h="7vh"
    position="sticky"
    px="3%"
    top={getHeaderTopPosition()}
    w="100%"
    zIndex={2}
  >
    <HStack gap={0} h="100%" w="100%">
      <Text fontSize="xl" px={0} textAlign="center" w="50%">
        상품
      </Text>
      <Text fontSize="xl" px={0} textAlign="center" w="25%">
        등록
      </Text>
    </HStack>
  </Flex>
);

const ProductList = ({ productList }: { productList: ProductWithSalesRecord[] }) => (
  <>
    {productList.map(item => (
      <ListElement key={item.id}>
        <ProductRow productInfo={item} />
      </ListElement>
    ))}
  </>
);
