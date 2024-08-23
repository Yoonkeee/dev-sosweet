import {
  Button,
  Flex,
  Heading,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
  Portal,
  Select,
  Switch,
  Text,
  Tooltip,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';
import { some } from 'lodash';
import { useCallback, useRef, type MutableRefObject } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { useRecoilValue } from 'recoil';
import type { Category, ProductWithSalesRecord } from 'src/types/dto';
import { deleteProduct, modProduct } from '../mockApi';
import { CATEGORIES } from '../modals/consts';
import { productNameListState } from '../store/product';

type FormValues = {
  category: Category;
  name: string;
  defaultPrice: number;
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
  const toast = useToast();
  const ref = useRef<HTMLElement | null>(null);

  const { mutate: updateMutate } = useMutation({
    mutationFn: modProduct,
    onSuccess: () => {
      toast({
        title: '상품 수정에 성공했어요 ✏️',
        status: 'success',
        position: 'top',
        duration: 1000,
        isClosable: true,
      });
      onClose();
    },
  });

  const { mutate: deleteMutate } = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      toast({
        title: '상품 삭제에 성공했어요 ✏️',
        status: 'success',
        position: 'top',
        duration: 1000,
        isClosable: true,
      });
      onClose();
    },
    onError: () => {
      toast({
        title: '상품 삭제에 실패했어요 🥲',
        status: 'error',
        position: 'top',
        duration: 1000,
        isClosable: true,
      });
      onClose();
    },
  });

  const {
    formState: { errors, isValid, isSubmitting, isDirty },
    handleSubmit,
    register,
  } = useForm<FormValues>({
    defaultValues: {
      ...productInfo,
    },
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<FormValues> = data => {
    const newProduct = {
      ...data,
      id: productInfo.id,
    };
    updateMutate({ newProduct });
    onClose();
  };

  const isDuplicateName = useCallback((value: string) => {
    if (productInfo.name === value) return true;
    return !some(productNameList, name => name === value);
  }, []);

  const handleDelete = () => deleteMutate({ id: productInfo.id });

  return (
    <Modal isCentered isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent m="3%" ref={ref}>
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
                {...register('category', {
                  required: true,
                })}
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
              <Tooltip
                label={errors.name ? errors.name.message : ''}
                isOpen={!!errors.name}
                bg="#ff5050"
                color="white"
                padding="8px"
                placement="bottom-start"
              >
                <Input
                  placeholder="상품명(필수)"
                  variant="filled"
                  {...register('name', {
                    required: true,
                    validate: value => isDuplicateName(value) || '이미 존재하는 상품명이에요 🫢',
                  })}
                  style={{
                    border: errors.name ? '2px solid red' : '',
                  }}
                />
              </Tooltip>
            </HStack>
            <HStack w="100%">
              <Text minW="20%">판매가</Text>
              <Input
                type="number"
                placeholder="판매가(필수) - 숫자만 입력할 수 있어요."
                variant="filled"
                {...register('defaultPrice', {
                  required: true,
                  valueAsNumber: true,
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
            <DeleteProductButton modalRef={ref} onDelete={handleDelete} />
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
                    ...(isValid && { transform: 'scale(1.2)' }),
                  }}
                  bg="#1a2a52"
                  color="white"
                  rounded="xl"
                  type="submit"
                  isDisabled={!isValid || isSubmitting || !isDirty}
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

const DeleteProductButton = ({
  modalRef,
  onDelete,
}: {
  modalRef: MutableRefObject<HTMLElement | null>;
  onDelete: VoidFunction;
}) => {
  return (
    <Popover placement="top-start">
      <PopoverTrigger>
        <Button
          _hover={{
            textDecoration: 'none',
            rounded: 'xl',
            transform: 'scale(1.2)',
          }}
          color="#f8f8f8"
          colorScheme="yellow"
          rounded="xl"
        >
          삭제
        </Button>
      </PopoverTrigger>
      <Portal containerRef={modalRef}>
        <PopoverContent bg="gray.200" w="100%">
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverBody>
            <Heading fontSize="2xl" my="3vh">
              상품을 삭제할까요?
            </Heading>
            <Button colorScheme="yellow" onClick={onDelete}>
              삭제할게요!
            </Button>
          </PopoverBody>
        </PopoverContent>
      </Portal>
    </Popover>
  );
};
