import {
  Avatar,
  AvatarBadge,
  Button,
  Flex,
  Heading,
  HStack,
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
import { useEffect, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { cancelCheckin, cancelHistory, useIsNarrow } from '../../api';
import DogInfo from '../../modals/DogInfo';
import ModifyHistory from '../../modals/ModifyHistory';
import { NameProfileImage } from '../NameWithProfileImage';

const CheckoutTimetableRow = ({
  belts: usedBelts,
  date,
  id,
  in_time,
  name,
  out_time,
  remaining_minutes: remainingMinutes,
}) => {
  const [belts, setBelts] = useState(usedBelts);
  const [nameColor, setNameColor] = useState('#1a2a52');
  const { isOpen: deleteIsOpen, onClose: deleteOnClose, onOpen: deleteOnOpen } = useDisclosure();
  const { isOpen: modHistoryIsOpen, onClose: modHistoryOnClose, onOpen: modHistoryOnOpen } = useDisclosure();
  const { isOpen: dogInfoModISOpen, onClose: dogInfoModOnClose, onOpen: dogInfoModOnOpen } = useDisclosure();
  const toast = useToast();
  const queryClient = useQueryClient();
  const isNarrow = useIsNarrow();

  const cancelHistoryMutation = useMutation({ mutationFn: cancelHistory });
  const cancelTimetableMutation = useMutation({
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
      queryClient.refetchQueries({ queryKey: ['timetable'] });
      queryClient.refetchQueries({ queryKey: ['checkoutTimetable'] });
      queryClient.refetchQueries({ queryKey: ['timetable', date] });
      queryClient.refetchQueries({ queryKey: ['checkoutTimetable', date] });
    },
  });

  const cancel = () => {
    cancelHistoryMutation.mutate(id);
    cancelTimetableMutation.mutate(id);
  };

  useEffect(() => {
    if (remainingMinutes < 0) {
      setNameColor('#ff7f50');
    }
  }, [remainingMinutes]);

  const StackProps = {
    fontFamily: 'Pretendard',
    fontSize: 'calc(min(0.5rem + 2.5vw, 1.25rem))',
    gap: 0,
    justifyContent: 'flex-start',
  };

  const LiquifiedStack = ({ children, onClick }) =>
    isNarrow ? (
      <VStack {...StackProps} onClick={onClick} w="auto">
        {children}
      </VStack>
    ) : (
      <HStack {...StackProps} onClick={onClick} w="60%">
        {children}
      </HStack>
    );

  return (
    <HStack
      bgColor="#dedede"
      border="1px gray solid"
      borderRadius="10px"
      gap={0}
      h="4.5rem"
      maxH="100px"
      minH="80px"
      px="1%"
      textAlign="center"
      w="96%"
    >
      <Flex h="100%" p={0} textAlign="center" w="50%">
        <NameProfileImage color={nameColor} name={name} />
      </Flex>
      <HStack
        alignItems="center"
        cursor="pointer"
        gap={4}
        justifyContent="flex-end"
        p={0}
        textAlign="center"
        w="50%"
      >
        <LiquifiedStack onClick={modHistoryOnOpen}>
          <Text fontWeight="800" p={0} size="md" textColor={nameColor} w="auto">
            {in_time}~
          </Text>
          <Text fontWeight="800" p={0} size="md" textColor={nameColor} w="auto">
            {out_time}
          </Text>
        </LiquifiedStack>
        <Flex
          alignContent="center"
          justifyContent="center"
          px={0}
          textAlign="center"
          w="calc(min(1rem + 8vw, 3.5rem))"
        >
          <Avatar
            bgColor="transparent"
            icon={
              <Popover isOpen={deleteIsOpen} onClose={deleteOnClose} placement="left">
                <PopoverTrigger>
                  <Button
                    _hover={{
                      textDecoration: 'none',
                      color: 'white',
                      transform: 'scale(1.2)',
                    }}
                    color="#f8f8f8"
                    colorScheme="yellow"
                    fontSize="md"
                    h="3.5vh"
                    onClick={deleteOnOpen}
                    position="inherit"
                    rounded="7.5px"
                    size="sm"
                    w="100%"
                  >
                    삭제
                  </Button>
                </PopoverTrigger>
                <Portal>
                  <PopoverContent bg="gray.200" w="100%">
                    <PopoverArrow />
                    <PopoverCloseButton />
                    <PopoverBody textAlign="center">
                      <Heading fontSize="2xl" my="3vh">
                        내역을 삭제할까요?
                      </Heading>
                      <Button
                        colorScheme="yellow"
                        onClick={() => {
                          cancel();
                          deleteOnClose();
                        }}
                      >
                        삭제할게요!
                      </Button>
                    </PopoverBody>
                  </PopoverContent>
                </Portal>
              </Popover>
            }
            w="100%"
          >
            {belts > 0 ? (
              <AvatarBadge bg="orange.500" boxSize="1.5em" fontSize="xl">
                <Text fontSize="0.8em" fontWeight="black">
                  {belts}
                </Text>
              </AvatarBadge>
            ) : (
              ''
            )}
          </Avatar>
        </Flex>
      </HStack>
      {dogInfoModISOpen ? (
        <DogInfo isOpen={dogInfoModISOpen} name={name} onClose={dogInfoModOnClose} />
      ) : null}
      {modHistoryIsOpen ? (
        <ModifyHistory
          {...{
            id,
            name,
            belts,
            in_time,
            out_time,
            date,
          }}
          isOpen={modHistoryIsOpen}
          onClose={modHistoryOnClose}
        />
      ) : null}
    </HStack>
  );
};

export default CheckoutTimetableRow;
