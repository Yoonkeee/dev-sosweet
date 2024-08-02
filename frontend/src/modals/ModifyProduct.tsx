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
import { some } from 'lodash';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { useRecoilValue } from 'recoil';
import type { Category, ProductWithSalesRecord } from 'src/types/dto';
import { CATEGORIES } from '../modals/consts';
import { productNameListState } from '../store/product';

type FormValue = {
  category: Category;
  name: string;
  defaultPrice: string;
  isValidDate: boolean;
  totalRevenue: number;
  totalQuantitySold: number;
  productImage: string | null;
  vendor: string | null;
};

type Props = {
  isOpen: boolean;
  onClose: VoidFunction;
  productInfo: ProductWithSalesRecord;
};

export const ModifyProduct = ({ isOpen, onClose, productInfo }: Props) => {
  const productNameList = useRecoilValue(productNameListState);

  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<FormValue>({
    defaultValues: {
      ...productInfo,
      defaultPrice: String(productInfo.defaultPrice),
    },
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<FormValue> = data => {
    // TODO: Issue-20 상품 수정 API 연동 예정
  };

  return (
    <Modal isCentered isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent m="3%">
        <ModalHeader>상품 정보 ✏️</ModalHeader>
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
                id="category"
                w="40%"
                placeholder="카테고리(필수)"
                {...register('category', { required: true })}
                style={{
                  border: errors.category ? '2px solid red' : '',
                }}
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
              <Input
                placeholder="상품명(필수)"
                variant="filled"
                {...register('name', {
                  required: true,
                  validate: value =>
                    !some(productNameList, name => name === value) || '이미 존재하는 상품명이에요 🫢',
                })}
                style={{
                  border: errors.name ? '2px solid red' : '',
                }}
              />
            </HStack>
            <HStack w="100%">
              <Text minW="20%">판매가</Text>
              <Input
                type="number"
                placeholder="판매가(필수) - 숫자만 입력할 수 있어요."
                variant="filled"
                {...register('defaultPrice', {
                  required: true,
                })}
                style={{
                  border: errors.defaultPrice ? '2px solid red' : '',
                }}
              />
            </HStack>
            <HStack w="100%">
              <Text minW="20%">거래처</Text>
              <Input placeholder="거래처(선택)" variant="filled" {...register('vendor')} />
            </HStack>
            <HStack w="100%">
              <Text minW="20%">누적판매</Text>
              <HStack>
                <Input disabled variant="filled" w="60%" {...register('totalRevenue')} />
                <Input disabled variant="filled" w="40%" {...register('totalQuantitySold')} />
              </HStack>
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
              <HStack gap={0}>
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
                  저장~
                </Button>
              </HStack>
            </Flex>
          </ModalFooter>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
