import { Flex, HStack, Text } from '@chakra-ui/react';
import { ListElement } from '../List';
import { NameProfileImage } from '../NameWithProfileImage';

export const Time = ({ color, name, onClick, over_minutes: overMinutes }) => {
  const overHours = Math.floor(Math.abs(overMinutes) / 60);
  const overMins = Math.abs(overMinutes % 60);

  return (
    <ListElement height="2rem">
      <Flex h="100%" p={0} textAlign="center" w="45%">
        <NameProfileImage name={name} showAllergy={false} />
      </Flex>
      <HStack
        alignItems="center"
        cursor="pointer"
        fontFamily="Pretendard"
        fontSize="calc(min(0.5rem + 2.5vw, 1.25rem))"
        justifyContent="flex-end"
        onClick={() => onClick(name)}
        pr={8}
        textAlign="center"
        w="55%"
      >
        <Text color={color} fontSize="xl" fontWeight="bold" textAlign="right">
          -{overHours}시간 {overMins}분
        </Text>
      </HStack>
    </ListElement>
  );
};
