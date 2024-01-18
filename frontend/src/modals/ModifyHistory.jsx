import {
  Button,
  Flex,
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
  Text,
  useDisclosure,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import moment from 'moment/moment';
import { cancelHistory, dateStrToTemporal, modHistory, switchHistoryToPaid } from '../api';
import { ProfileImage } from '../components/NameWithProfileImage';
import { DateController } from '../components/DateController';

function minutesToHHMM(minutes) {
  const hours = Math.floor(minutes / 60);
  const remainderMinutes = minutes % 60;
  const formattedHours = hours.toString().padStart(2, '0');
  const formattedMinutes = remainderMinutes.toString().padStart(2, '0');
  return `${formattedHours}:${formattedMinutes}`;
}

const ModifyHistory = ({ belts, date: propDate, id, in_time, isOpen, name, onClose, out_time }) => {
  const ref = useRef(null);
  const [tobeDate, setTobeDate] = useState(dateStrToTemporal(propDate));
  const [formattedDate, setFormattedDate] = useState();
  useEffect(() => {
    setFormattedDate(tobeDate.toLocaleString('ko-KR', { month: 'long', day: 'numeric', weekday: 'long' }));
  }, [tobeDate]);
  let checkoutData = { status: new Date() };
  const defaultInTime = in_time.replace(':', '');
  const defaultOutTime = out_time.replace(':', '');
  let inPinNumber = defaultInTime.split('');
  let outPinNumber = defaultOutTime.split('');
  const { handleSubmit, register, reset, setValue } = useForm({
    defaultValues: {
      inPinNumber,
      outPinNumber,
      belts,
    },
  });
  const toast = useToast();
  const queryClient = useQueryClient();
  const toastOnSuccess = data => {
    toast({
      title: (
        <>
          사용내역 수정! <br />
          댕댕이 : {data.name} <br />
          사용날짜 : {formattedDate} <br />
          입장시간 : {data.in_time} <br />
          퇴장시간 : {data.out_time} <br />
          이용시간 : {minutesToHHMM(data.minutes)} <br />
          매너벨트 : {data.belts}개 <br />
        </>
      ),
      status: 'success',
      position: 'top',
      duration: 1500,
      isClosable: true,
    });
  };
  const mutation = useMutation({
    mutationFn: modHistory,
    onSuccess: () => {
      onClose();
      reset();
      queryClient.refetchQueries({ queryKey: ['timetable'] });
      queryClient.refetchQueries({ queryKey: ['checkoutTimetable'] });
      queryClient.refetchQueries({ queryKey: ['history'] });
    },
  });
  const onSubmit = data => {
    inPinNumber = data.inPinNumber.join('').replace(/(\d{2})(\d{2})/, '$1:$2');
    outPinNumber = data.outPinNumber.join('').replace(/(\d{2})(\d{2})/, '$1:$2');
    const inTime = moment(inPinNumber, 'HH:mm');
    const outTime = moment(outPinNumber, 'HH:mm');
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
    checkoutData = {
      id,
      name,
      in_time: inPinNumber,
      out_time: outPinNumber,
      belts: data.belts,
      date: tobeDate,
      minutes: diffMinutes,
      check_today: false,
    };
    mutation.mutate(checkoutData);
    toastOnSuccess(checkoutData);
  };
  const cancelMutation = useMutation({
    mutationFn: cancelHistory,
    onSuccess: () => {
      toast({
        title: (
          <>
            사용내역 삭제! <br />
            댕댕이 : {name} <br />
            사용날짜 : {formattedDate} <br />
          </>
        ),
        status: 'success',
        position: 'top',
        duration: 1000,
        isClosable: true,
      });
      onClose();
      reset();
      queryClient.refetchQueries({ queryKey: ['history'] });
      queryClient.refetchQueries({ queryKey: ['timetable'] });
      queryClient.refetchQueries({ queryKey: ['checkoutTimetable'] });
    },
  });
  const cancel = () => {
    cancelMutation.mutate(id);
  };

  const toastOnSwitchPaid = result => {
    if (result) {
      toast({
        title: <>당일 결제로 수정했어요!</>,
        status: 'success',
        position: 'top',
        duration: 1500,
        isClosable: true,
      });
    } else {
      toast({
        title: <>당일 결제로 수정에 실패했어요...</>,
        status: 'error',
        position: 'top',
        duration: 3000,
        isClosable: true,
      });
    }
    queryClient.refetchQueries({ queryKey: ['checkoutTimetable'] });
  };
  return (
    <Modal isCentered isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent ref={ref}>
        <ModalHeader pb={0}>
          <HStack maxH="80px" w="100%">
            <Flex alignItems="center" aspectRatio={1} justifyContent="center" maxH="80px">
              <ProfileImage name={name} />
            </Flex>
            <Text fontSize="2xl" fontWeight={900}>
              {name}
            </Text>
            <Text fontSize="xl" fontWeight={700}>
              사용내역 수정
            </Text>
          </HStack>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody as="form" onSubmit={handleSubmit(onSubmit)}>
          <VStack alignItems="flex-start" spacing={3}>
            <DateController
              date={tobeDate}
              onNext={() => setTobeDate(tobeDate.add({ days: 1 }))}
              onPrev={() => setTobeDate(tobeDate.subtract({ days: 1 }))}
            />
            <HStack w="100%">
              <Text fontWeight={900} w="30%">
                입장시간
              </Text>
              <HStack>
                <PinInput defaultValue={defaultInTime} placeholder="0">
                  <PinInputField h={9} w="40px" {...register('inPinNumber[0]')} required />
                  <PinInputField h={9} w="40px" {...register('inPinNumber[1]')} required />
                  <Text fontSize="3xl" fontWeight="bold">
                    :
                  </Text>
                  <PinInputField h={9} w="40px" {...register('inPinNumber[2]')} required />
                  <PinInputField h={9} w="40px" {...register('inPinNumber[3]')} required />
                </PinInput>
              </HStack>
            </HStack>
            <HStack w="100%">
              <Text fontWeight={900} w="30%">
                퇴장시간
              </Text>
              <HStack>
                <PinInput defaultValue={defaultOutTime} placeholder="0">
                  <PinInputField h={9} w="40px" {...register('outPinNumber[0]')} required />
                  <PinInputField h={9} w="40px" {...register('outPinNumber[1]')} required />
                  <Text fontSize="3xl" fontWeight="bold">
                    :
                  </Text>
                  <PinInputField h={9} w="40px" {...register('outPinNumber[2]')} required />
                  <PinInputField h={9} w="40px" {...register('outPinNumber[3]')} required />
                </PinInput>
              </HStack>
            </HStack>
            <HStack w="100%">
              <Text fontWeight={900} w="30%">
                매너벨트
                <br />
                사용량
              </Text>
              <NumberInput
                defaultValue={belts > 0 ? belts : 0}
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
          </VStack>
          <ModalFooter mt="20px">
            <CalcelButton modalRef={ref} onCancel={cancel} />
            <SwitchPaidButton modalRef={ref} onModalClose={onClose} rowId={id} toast={toastOnSwitchPaid} />
            <Button
              _hover={{
                textDecoration: 'none',
                color: 'white',
                rounded: 'xl',
                transform: 'scale(1.2)',
              }}
              colorScheme="red"
              fontSize="lg"
              fontWeight={900}
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
              fontWeight={900}
              rounded="xl"
              type="submit"
            >
              수정
            </Button>
          </ModalFooter>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

const SwitchPaidButton = ({ modalRef, onModalClose, rowId, toast }) => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const onClick = () => {
    switchHistoryToPaid(rowId).then(res => {
      if (res.status === 200) {
        toast(true);
        onClose();
        onModalClose();
      } else {
        toast(false);
        onClose();
      }
    });
  };
  return (
    <Popover isOpen={isOpen} onClose={onClose} onOpen={onOpen} placement="top-start">
      <PopoverTrigger>
        <Button
          _hover={{
            textDecoration: 'none',
            rounded: 'xl',
            transform: 'scale(1.2)',
          }}
          colorScheme="whatsapp"
          fontSize="lg"
          fontWeight={900}
          mr={3}
          rounded="xl"
        >
          당일결제
        </Button>
      </PopoverTrigger>
      <Portal containerRef={modalRef}>
        <PopoverContent bg="gray.200" w="100%">
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverBody>
            <Heading fontSize="2xl" my="3vh">
              당일 결제로 수정할까요?
            </Heading>
            <Button colorScheme="whatsapp" onClick={onClick}>
              네!
            </Button>
          </PopoverBody>
        </PopoverContent>
      </Portal>
    </Popover>
  );
};

const CalcelButton = ({ modalRef, onCancel }) => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  return (
    <Popover isOpen={isOpen} onClose={onClose} onOpen={onOpen} placement="top-start">
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
          fontWeight={900}
          mr={3}
          rounded="xl"
        >
          취소
        </Button>
      </PopoverTrigger>
      <Portal containerRef={modalRef}>
        <PopoverContent bg="gray.200" w="100%">
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverBody>
            <Heading fontSize="2xl" my="3vh">
              내역을 삭제할까요?
            </Heading>
            <Button colorScheme="yellow" onClick={onCancel}>
              삭제할게요!
            </Button>
          </PopoverBody>
        </PopoverContent>
      </Portal>
    </Popover>
  );
};

export default ModifyHistory;
