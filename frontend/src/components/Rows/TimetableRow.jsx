import { Button, Flex, HStack, Text, useDisclosure, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import Checkout from '../../modals/Checkout';
import ChangeCheckInTime from '../../modals/ChangeCheckInTime';
import { setBelt, useIsNarrow } from '../../api';
import { NameProfileImage } from '../NameWithProfileImage';
import { MannerBeltButton } from '../Timetable/MannerBeltButton';

const TimetableRow = ({
  belts: loaded_belts,
  date,
  id,
  in_time,
  name,
  out_time,
  remaining_minutes: remainingMinutes,
}) => {
  const [belts, setBelts] = useState(loaded_belts);
  const { isOpen: isOutOpen, onClose: onOutClose, onOpen: onOutOpen } = useDisclosure();
  const { isOpen: checkinModIsOpen, onClose: checkinModOnClose, onOpen: checkinModOnOpen } = useDisclosure();
  const queryClient = useQueryClient();
  const isNarrow = useIsNarrow();

  useEffect(() => {
    if (belts) setBelt([id, belts]);
    queryClient.refetchQueries({ queryKey: ['timetable', date] });
  }, [belts]);
  const nameColor = remainingMinutes < 0 ? '#ff7f50' : '#1a2a52';

  const StackProps = {
    fontFamily: 'Pretendard',
    fontSize: 'calc(min(0.5rem + 2.5vw, 1.25rem))',
    gap: 0,
    justifyContent: 'flex-start',
  };
  const LiquifiedStack = ({ children }) =>
    isNarrow ? (
      <VStack {...StackProps} w="auto">
        {children}
      </VStack>
    ) : (
      <HStack {...StackProps} w="60%">
        {children}
      </HStack>
    );

  return (
    <HStack
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
        <NameProfileImage color={nameColor} name={name} showAllergy />
      </Flex>
      <HStack alignItems="center" gap={4} justifyContent="flex-end" p={0} textAlign="center" w="50%">
        <LiquifiedStack>
          <Text
            cursor="pointer"
            fontWeight={800}
            onClick={checkinModOnOpen}
            p={0}
            textAlign="left"
            textColor={nameColor}
            w="auto"
            whiteSpace="nowrap"
          >
            {in_time} ~
          </Text>
          <Flex
            alignContent="center"
            justifyContent="center"
            ml="5%"
            px={0}
            textAlign="center"
            // w="3rem"
            w="calc(min(1rem + 8vw, 3rem))"
          >
            <Button
              _hover={{
                textDecoration: 'none',
                color: 'white',
                bg: '#526491',
                transform: 'scale(1.2)',
              }}
              bg="#1a2a52"
              color="white"
              fontSize="lg"
              fontWeight={800}
              h="3.5vh"
              // ml="5%"
              onClick={onOutOpen}
              position="inherit"
              size="sm"
              w="100%"
              // w="calc(min(1rem + 8vw, 3.5rem))"
              // w="3rem"
            >
              <Text fontFamily="GmarketSans" fontSize="lg" fontWeight="800">
                퇴장
              </Text>
            </Button>
          </Flex>
        </LiquifiedStack>
        <Flex
          alignContent="center"
          justifyContent="center"
          px={0}
          textAlign="center"
          // w="3rem"
          w="calc(min(1rem + 8vw, 3rem))"
        >
          <MannerBeltButton belts={belts} setBelts={setBelts} />
        </Flex>
      </HStack>
      {checkinModIsOpen ? (
        <ChangeCheckInTime
          id={id}
          in_or_out="in"
          in_time={in_time}
          isOpen={checkinModIsOpen}
          name={name}
          onClose={checkinModOnClose}
        />
      ) : null}
      {isOutOpen ? (
        <Checkout
          belts={belts}
          id={id}
          in_time={in_time}
          isOpen={isOutOpen}
          name={name}
          onClose={onOutClose}
        />
      ) : null}
    </HStack>
  );
};

export default TimetableRow;
