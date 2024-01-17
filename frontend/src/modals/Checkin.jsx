import {
  Button,
  Flex,
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
  Select,
  Text,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import moment from 'moment';
import { useRecoilValue } from 'recoil';
import { useRef, useState } from 'react';
import { checkIn, dogsList, getAllergy } from '../api';
import { currentDateState } from '../store/store';
import { Allergy } from '../components/Allergy';

const Checkin = ({ isOpen, onClose }) => {
  const { data, isLoading } = useQuery({ queryKey: ['dogs-list'], queryFn: dogsList });
  // const [hasAllergy, setHasAllergy] = useState(false);
  const [name, setName] = useState('');
  // const {isOpen, onOpen, onClose} = useDisclosure()
  const { handleSubmit, register, reset } = useForm();
  const toast = useToast();
  const queryClient = useQueryClient();
  const ref = useRef(null);
  const [dogData, setDogData] = useState(null);

  const date = useRecoilValue(currentDateState);

  // let dogData = {};
  const mutation = useMutation({
    mutationFn: checkIn,
    onSuccess: () => {
      toast({
        title: (
          <>
            체크인! <br />
            댕댕이 : {dogData.name} <br />
            입장시간 : {dogData.in_time}
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

  const onSubmit = data => {
    const pinNumber = data.pinNumber.join('').replace(/(\d{2})(\d{2})/, '$1:$2');
    const inTime = moment(pinNumber, 'HH:mm');
    // console.log(inTime); // outputs "12:34"
    if (!inTime.isValid()) {
      toast({
        title: '입장 시간이 올바른 형식이 아닙니다.',
        status: 'error',
        position: 'top',
        duration: 1000,
        isClosable: true,
      });
      return;
    }
    const onFormData = {
      name: data.dogName,
      in_time: pinNumber,
      date,
      id: Date.now(),
    };
    setDogData(onFormData);
    mutation.mutate(onFormData);
  };
  const options =
    data &&
    data.map(item => ({
      value: item.name,
      label: item.name,
    }));

  const onChange = e => {
    setName(e.target.value);
  };

  const { data: hasAllergy } = useQuery({
    queryKey: ['allergy', name],
    queryFn: getAllergy,
  });

  return (
    <Modal isCentered isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>댕댕이 체크인!</ModalHeader>
        <ModalCloseButton />
        <ModalBody as="form" onSubmit={handleSubmit(onSubmit)}>
          <VStack my={3}>
            <VStack alignItems="flex-start" justifyContent="center" spacing={8} w="100%">
              <HStack w="100%">
                <Text w="30%">댕댕이</Text>
                {isLoading ? (
                  <Text>로딩중..</Text>
                ) : (
                  <Select
                    css={{ WebkitPaddingEnd: 0, WebkitPaddingStart: 10 }}
                    fontWeight={800}
                    icon={<></>}
                    mr={5}
                    placeholder="댕댕이 선택"
                    required
                    w="40%"
                    {...register('dogName')}
                    onChange={e => onChange(e)}
                  >
                    {options &&
                      options.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                  </Select>
                )}
              </HStack>
              <HStack w="100%">
                <Text w="30%">입장 시간</Text>
                <PinInput placeholder="0">
                  <PinInputField ref={ref} w="40px" {...register('pinNumber[0]')} required />
                  <PinInputField w="40px" {...register('pinNumber[1]')} required />
                  <Text fontSize="3xl" fontWeight="bold">
                    :
                  </Text>
                  <PinInputField w="40px" {...register('pinNumber[2]')} required />
                  <PinInputField w="40px" {...register('pinNumber[3]')} required />
                </PinInput>
              </HStack>
            </VStack>
            {hasAllergy && (
              <HStack
                alignContent="center"
                alignItems="center"
                justifyContent="flex-end"
                my="0.5rem"
                w="100%"
              >
                <Text fontSize="lg" w="auto">
                  알러지 주의 :{' '}
                </Text>
                <Flex mr="8%">
                  <Allergy fontSize={1.2} name={name} />
                </Flex>
              </HStack>
            )}
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
              fontWeight={800}
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
              fontWeight={800}
              rounded="xl"
              type="submit"
            >
              입장!
            </Button>
          </ModalFooter>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default Checkin;
