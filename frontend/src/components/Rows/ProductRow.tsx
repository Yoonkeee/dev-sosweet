import { Button, HStack, Text, useDisclosure } from '@chakra-ui/react';
import type { ProductWithSalesRecord } from 'src/types/dto';
import { ModifyProduct } from '../../modals/ModifyProduct';
import { ProductImage } from '../NameWithProfileImage/ProductImage';

type Props = {
  productInfo: ProductWithSalesRecord;
};

const ProductRow = ({ productInfo }: Props) => {
  const { defaultPrice, itemsReceivedCount, name, productImage } = productInfo;
  const { isOpen: isModifyOpen, onClose: onModifyClose, onOpen: onModifyOpen } = useDisclosure();

  const formattedPrice = String(defaultPrice).replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  return (
    <HStack h="100%" justifyContent="space-between" w="100%">
      <HStack h="100%" w="50%">
        <ProductImage path={productImage} w="auto" />
        <Text cursor="pointer" onClick={() => onModifyOpen()}>
          {name} ({formattedPrice})
        </Text>
      </HStack>
      <HStack h="100%" justifyContent="space-between" w="25%">
        <Text fontSize="sm" fontWeight="bold" textAlign="center" textColor="#1a2a52" w="100%">
          {itemsReceivedCount}
        </Text>
      </HStack>
      <HStack h="100%" justifyContent="end" paddingRight="3%" w="25%">
        <Button
          _hover={{
            textDecoration: 'none',
            color: 'white',
            rounded: 'xl',
            transform: 'scale(1.2)',
          }}
          colorScheme="twitter"
          onClick={() => {
            // TODO: 입고 등록 모달 열기 로직 연결
          }}
          rounded="xl"
        >
          입고
        </Button>
      </HStack>
      {isModifyOpen && <ModifyProduct isOpen onClose={onModifyClose} productInfo={productInfo} />}
    </HStack>
  );
};

export default ProductRow;
