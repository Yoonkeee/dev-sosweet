import {
  Box,
  Button,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  PinInput,
  PinInputField,
  Text,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import moment from 'moment';
import { useRecoilValue } from 'recoil';
import { changeCheckIn } from '../api';
import { currentDateState } from '../store/store';

const ChangeCheckInTime = ({ id, in_or_out, isOpen, name, onClose }) => {
  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = useForm();
  const toast = useToast();
  const date = useRecoilValue(currentDateState);
  let dogData = { null: null };
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: changeCheckIn,
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ['timetable'] });
      queryClient.refetchQueries({ queryKey: ['checkoutTimetable'] });
      onClose();
      reset();
    },
  });
  const onSubmit = data => {
    const pinNumber = data.pinNumber.join('').replace(/(\d{2})(\d{2})/, '$1:$2');
    // console.log(pinNumber); // outputs "12:34"
    const outTime = moment(pinNumber, 'HH:mm');
    if (!outTime.isValid()) {
      toast({
        title: '시간이 올바른 형식이 아닙니다.',
        status: 'error',
        position: 'top',
        duration: 1000,
        isClosable: true,
      });
      return;
    }
    dogData = {
      name,
      in_time: pinNumber,
      date,
      id,
      in_or_out,
    };
    mutation.mutate(dogData);
    toast({
      title: (
        <>
          체크{in_or_out === 'in' ? '인' : '아웃'} 수정! <br />
          댕댕이 : {name} <br />
          {in_or_out === 'in' ? '입' : '퇴'}장시간 : {dogData.in_time}
        </>
      ),
      status: 'success',
      position: 'top',
      duration: 1000,
      isClosable: true,
    });
  };
  return (
    <Modal isCentered isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>댕댕이 체크{in_or_out === 'in' ? '인' : '아웃'} 시간 수정!</ModalHeader>
        <ModalCloseButton />
        <ModalBody as="form" onSubmit={handleSubmit(onSubmit)}>
          <VStack spacing={3}>
            <HStack w="100%">
              <Text fontSize="lg" fontWeight="bold" justifyContent="flex-start" w="30%">
                {name}
              </Text>
              <HStack>
                <PinInput placeholder="0">
                  <PinInputField w="40px" {...register('pinNumber[0]')} required />
                  <PinInputField w="40px" {...register('pinNumber[1]')} required />
                  <Text fontSize="3xl" fontWeight="bold">
                    :
                  </Text>
                  <PinInputField w="40px" {...register('pinNumber[2]')} required />
                  <PinInputField w="40px" {...register('pinNumber[3]')} required />
                </PinInput>
              </HStack>
              <Box w="20%" />
            </HStack>
          </VStack>
          <ModalFooter>
            <Button
              _hover={{
                textDecoration: 'none',
                color: 'white',
                rounded: 'xl',
                transform: 'scale(1.2)',
              }}
              colorScheme="red"
              mr={3}
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
              수정!
            </Button>
          </ModalFooter>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ChangeCheckInTime;
