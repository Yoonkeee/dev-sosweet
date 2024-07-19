import {
  Button,
  Flex,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Switch,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { CATEGORIES } from 'src/modals/consts';
import type { Category } from 'src/types/dto';
import type { ModalProps } from '../modals';

type FormValue = {
  category: Category;
  name: string;
  defaultPrice: string;
  isValidDate: boolean;
  productImage: string | null;
  vendor: string | null;
};

const NewProduct = ({ isOpen, onClose }: ModalProps) => {
  const { handleSubmit, register } = useForm<FormValue>();

  const onSubmit: SubmitHandler<FormValue> = data => {
    // TODO: Issue-#12에서 상품 추가 API 연결
  };

  return (
    <Modal isCentered isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent m="3%">
        <ModalHeader>상품 추가 📦</ModalHeader>
        <ModalCloseButton />
        <ModalBody as="form" onSubmit={handleSubmit(onSubmit)}>
          <VStack w="100%">
            <HStack w="100%">
              <Flex alignContent="center" aspectRatio={1} h="90%" justifyContent="center" minW="20%">
                <Flex
                  alignContent="center"
                  alignItems="center"
                  aspectRatio={1}
                  bgColor="transparent"
                  border="3px lightgray solid"
                  cursor="pointer"
                  display="flex"
                  justifyContent="center"
                  m={0}
                  onClick={e => {
                    // TODO: 상품 썸네일 모달 연결
                  }}
                  rounded="full"
                  w="100%"
                >
                  <Text fontSize="xx-large">🦴</Text>
                </Flex>
              </Flex>
              <Select
                css={{ WebkitPaddingEnd: 0, WebkitPaddingStart: 10 }}
                icon={<></>}
                paddingInlineEnd={0}
                paddingInlineStart={0}
                placeholder="카테고리 선택"
                position="inherit"
                px={0}
                required
                w="40%"
                {...register('category')}
                id="name"
              >
                {CATEGORIES.map(name => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
              </Select>
              <Text>유통기한</Text>
              <Switch size="lg" {...register('isValidDate')} />
            </HStack>
            <HStack w="100%">
              <Text minW="20%">상품명</Text>
              <Input placeholder="상품명(필수)" variant="filled" {...register('name')} />
            </HStack>
            <HStack w="100%">
              <Text minW="20%">판매가</Text>
              <Input placeholder="판매가(필수)" variant="filled" {...register('defaultPrice')} />
            </HStack>
            <HStack w="100%">
              <Text minW="20%">거래처</Text>
              <Input placeholder="거래처(선택)" variant="filled" {...register('vendor')} />
            </HStack>
          </VStack>
          <ModalFooter mx={0} px={0}>
            <Flex
              css={{ WebkitMarginStart: 0 }}
              justifyContent="flex-end"
              m={0}
              marginInlineStart={0}
              p={0}
              w="100%"
            >
              <Button
                _hover={{
                  textDecoration: 'none',
                  color: 'white',
                  rounded: 'xl',
                  transform: 'scale(1.2)',
                }}
                colorScheme="red"
                mx={3}
                onClick={onClose}
                rounded="xl"
              >
                취소
              </Button>
              <Button
                _hover={{
                  textDecoration: 'none',
                  color: 'white',
                  bg: '#526491',
                  rounded: 'xl',
                  transform: 'scale(1.2)',
                }}
                bg="#1a2a52"
                color="white"
                rounded="xl"
                type="submit"
              >
                추가~
              </Button>
            </Flex>
          </ModalFooter>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default NewProduct;
