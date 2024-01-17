import {
  Button,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  PinInput,
  PinInputField,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
  Portal,
  Switch,
  Text,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import moment from 'moment/moment';
import { useRecoilValue } from 'recoil';
import { cancelCheckin, checkOut, getIdInfo } from '../api';
import { currentDateState } from '../store/store';

function minutesToHHMM(minutes) {
  const hours = Math.floor(minutes / 60);
  const remainderMinutes = minutes % 60;
  const formattedHours = hours.toString().padStart(2, '0');
  const formattedMinutes = remainderMinutes.toString().padStart(2, '0');
  return `${formattedHours}:${formattedMinutes}`;
}

const Checkout = ({ belts, id, in_time, isOpen, name, onClose }) => {
  const ref = useRef(null);
  const [checkoutData, setCheckoutData] = useState(null);
  // let checkoutData = {};
  const { handleSubmit, register, reset } = useForm();
  const toast = useToast();
  const date = useRecoilValue(currentDateState);
  const queryClient = useQueryClient();
  const [payToday, setPayToday] = useState(false);
  const { data, isLoading } = useQuery({ queryKey: ['id-info', id], queryFn: getIdInfo });
  const mutation = useMutation({
    mutationFn: checkOut,
    onSuccess: () => {
      toast({
        title: (
          <>
            체크아웃! <br />
            댕댕이 : {checkoutData.name} <br />
            입장시간 : {checkoutData.in_time} <br />
            퇴장시간 : {checkoutData.out_time} <br />
            이용시간 : {minutesToHHMM(checkoutData.minutes)} <br />
            매너벨트 : {checkoutData.belts}개 <br />
          </>
        ),
        status: 'success',
        position: 'top',
        duration: 1500,
        isClosable: true,
      });
      onClose();
      reset();
      queryClient.refetchQueries({ queryKey: ['timetable'] });
      queryClient.refetchQueries({ queryKey: ['checkoutTimetable'] });
    },
  });
  const onSubmit = formData => {
    const pinNumber = formData.pinNumber.join('').replace(/(\d{2})(\d{2})/, '$1:$2');
    const inTime = moment(in_time, 'HH:mm');
    const outTime = moment(pinNumber, 'HH:mm');
    if (!outTime.isValid()) {
      toast({
        title: '퇴장 시간이 올바른 형식이 아닙니다.',
        status: 'error',
        position: 'top',
        duration: 1000,
        isClosable: true,
      });
      return;
    }
    if (inTime >= outTime) {
      toast({
        title: '퇴장 시간이 입장 시간보다 빠릅니다.',
        status: 'error',
        position: 'top',
        duration: 1000,
        isClosable: true,
      });
      return;
    }
    const diffMinutes = outTime.diff(inTime, 'minutes');
    const onFormData = {
      id,
      name,
      in_time,
      out_time: pinNumber,
      belts: data.belts,
      date,
      minutes: diffMinutes,
      payToday,
    };
    setCheckoutData(onFormData);
    mutation.mutate(onFormData);
  };
  const cancelMutation = useMutation({
    mutationFn: cancelCheckin,
    onSuccess: () => {
      toast({
        title: (
          <>
            사용내역 삭제! <br />
            댕댕이 : {name} <br />
            사용날짜 : {document.getElementById('formattedNowDateTimetable').innerText} <br />
          </>
        ),
        status: 'success',
        position: 'top',
        duration: 1000,
        isClosable: true,
      });
      onClose();
      reset();
      queryClient.refetchQueries({ queryKey: ['timetable'] });
      queryClient.refetchQueries({ queryKey: ['checkoutTimetable'] });
      queryClient.refetchQueries({ queryKey: ['timetable', date] });
      queryClient.refetchQueries({ queryKey: ['checkoutTimetable', date] });
    },
  });
  const cancel = () => {
    cancelMutation.mutate(id);
  };
  useEffect(() => {
    if (data && !isLoading) {
      reset({
        belts,
      });
    }
  }, [isOpen]);

  return (
    <Modal isCentered isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent ref={ref}>
        <ModalHeader>{name}🥰 체크아웃!</ModalHeader>
        <ModalCloseButton />
        <ModalBody as="form" onSubmit={handleSubmit(onSubmit)}>
          <VStack alignItems="flex-start" m={0} spacing={0}>
            <HStack w="100%">
              <Text w="30%">퇴장시간</Text>
              <HStack>
                <PinInput placeholder="0">
                  <PinInputField h={9} w="40px" {...register('pinNumber[0]')} required />
                  <PinInputField h={9} w="40px" {...register('pinNumber[1]')} required />
                  <Text fontSize="3xl" fontWeight="bold">
                    :
                  </Text>
                  <PinInputField h={9} w="40px" {...register('pinNumber[2]')} required />
                  <PinInputField h={9} w="40px" {...register('pinNumber[3]')} required />
                </PinInput>
              </HStack>
            </HStack>
            <HStack w="100%">
              <Text my="6%" w="30%">
                매너벨트 사용량
              </Text>
              <NumberInput
                // defaultValue={0}
                id="beltInput"
                maxW="20%"
                min={0}
                size="md"
                {...register('belts')}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </HStack>
            <HStack alignItems="center" w="100%">
              <FormControl alignItems="center" display="flex" mb="5%">
                <FormLabel mb={0} w="29.5%">
                  당일 결제
                </FormLabel>
                <Switch
                  onChange={e => {
                    if (e.target.checked) {
                      setPayToday(true);
                    } else {
                      setPayToday(false);
                    }
                  }}
                  size="lg"
                />
              </FormControl>
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
                  fontSize="lg"
                  fontWeight={700}
                  mr={3}
                  rounded="xl"
                >
                  체크인 취소
                </Button>
              </PopoverTrigger>
              <Portal containerRef={ref}>
                <PopoverContent bg="gray.200" w="100%">
                  <PopoverArrow />
                  <PopoverCloseButton />
                  <PopoverBody>
                    <Heading fontSize="2xl" my="3vh">
                      체크인 취소할까요?
                    </Heading>
                    <Button colorScheme="yellow" onClick={cancel}>
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
              fontSize="lg"
              fontWeight={700}
              mr={3}
              onClick={onClose}
              rounded="xl"
            >
              닫기
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
              fontSize="lg"
              fontWeight={700}
              rounded="xl"
              type="submit"
            >
              체크아웃!
            </Button>
          </ModalFooter>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default Checkout;
