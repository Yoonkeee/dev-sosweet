import {
  Button,
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
  Text,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { cancelPay, dateStrToTemporal, modPay, temporalToLocale } from '../api';
import { ProfileImage } from '../components/NameWithProfileImage';
import { DateController } from '../components/DateController';

const ModifyPay = ({ date: propDate, id, isOpen, minutes: propMinutes, name, onClose }) => {
  const [nowDate, setNowDate] = useState(dateStrToTemporal(propDate));
  const [minutes, setMinutes] = useState(propMinutes);
  const [formattedDate, setFormattedDate] = useState();
  const hours = Math.floor(propMinutes / 60);
  useEffect(() => {
    setNowDate(dateStrToTemporal(propDate));
  }, []);
  useEffect(() => {
    if (nowDate) setFormattedDate(temporalToLocale(nowDate));
  }, [nowDate]);

  const ref = useRef(null);
  let checkoutData = {};
  const { handleSubmit, register, reset, setValue } = useForm({
    defaultValues: {
      hours,
      date: nowDate,
    },
  });
  const toast = useToast();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: modPay,
    onSuccess: data => {
      toast({
        title: (
          <>
            구매내역 수정! <br />
            댕댕이 : {name} <br />
            결제시간 : {Math.floor(minutes / 60)}시간 <br />
            결제일 : {formattedDate} <br />
          </>
        ),
        status: 'success',
        position: 'top',
        duration: 1000,
        isClosable: true,
      });
      onClose();
      reset();
      queryClient.refetchQueries({ queryKey: ['getPayHistory'] });
    },
  });

  const onSubmit = data => {
    const modDate = nowDate.toString();
    checkoutData = {
      name,
      date: modDate,
      minutes: data.hours * 60,
      id,
    };
    setMinutes(data.hours * 60);
    mutation.mutate(checkoutData);
  };

  const cancelMutation = useMutation({
    mutationFn: cancelPay,
    onSuccess: () => {
      toast({
        title: (
          <>
            구매 취소! <br />
            댕댕이 : {name} <br />
            결제시간 : {hours}시간 <br />
            결제일 : {formattedDate} <br />
          </>
        ),
        status: 'success',
        position: 'top',
        duration: 1000,
        isClosable: true,
      });
      onClose();
      reset();
      queryClient.refetchQueries({ queryKey: ['getPayHistory'] });
    },
  });

  const cancel = () => {
    cancelMutation.mutate(id);
  };

  const onCloseReset = () => {
    onClose();
    reset();
  };

  return (
    <Modal isCentered isOpen={isOpen} onClose={onCloseReset}>
      <ModalOverlay />
      <ModalContent ref={ref}>
        <ModalHeader>
          <HStack>
            <ProfileImage name={name} />
            <Text>{name} 결제 내역 수정</Text>
          </HStack>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody as="form" onSubmit={handleSubmit(onSubmit)}>
          <VStack alignItems="flex-start" spacing={3}>
            <HStack alignContent="center" alignItems="center" justifyContent="flex-start" w="100%">
              <Text w="30%">결제일</Text>
              <DateController
                date={nowDate}
                onNext={() => setNowDate(nowDate.add({ days: 1 }))}
                onPrev={() => setNowDate(nowDate.subtract({ days: 1 }))}
              />
            </HStack>
            <HStack>
              <Text my="5%" w="48%">
                결제시간
              </Text>
              <Input
                placeholder="결제 시간"
                type="number"
                variant="filled"
                w="20%"
                {...register('hours', { required: true })}
              />
              <Text>시간</Text>
            </HStack>
          </VStack>
          <ModalFooter>
            <Popover placement="top-start">
              <PopoverTrigger>
                <Button
                  _hover={{
                    textDecoration: 'none',
                    color: 'white',
                    rounded: 'xl',
                    transform: 'scale(1.2)',
                  }}
                  color="#f8f8f8"
                  colorScheme="yellow"
                  mr={3}
                  rounded="xl"
                >
                  결제 취소
                </Button>
              </PopoverTrigger>
              <Portal containerRef={ref}>
                <PopoverContent bg="gray.200" w="100%">
                  <PopoverArrow />
                  <PopoverCloseButton />
                  <PopoverBody>
                    <Heading fontSize="2xl" my="3vh">
                      결제 취소할까요?
                    </Heading>
                    <Button color="#f8f8f8" colorScheme="yellow" onClick={cancel}>
                      취소할게요!
                    </Button>
                  </PopoverBody>
                </PopoverContent>
              </Portal>
            </Popover>
            <Button
              _hover={{
                textDecoration: 'none',
                color: 'white',
                rounded: 'xl',
                transform: 'scale(1.2)',
              }}
              colorScheme="red"
              mr={3}
              onClick={onCloseReset}
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
              수정하기
            </Button>
          </ModalFooter>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ModifyPay;
