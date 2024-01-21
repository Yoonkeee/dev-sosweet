import { Flex, HStack, Text } from '@chakra-ui/react';
import { useSetRecoilState } from 'recoil';
import { Refresh } from '../../CustomIcons/Refresh';
import { ListElement } from '../../List';
import { setTodayState } from '../../../store/store';
import { ArrowForward } from '../../CustomIcons/ArrowForward';

export const RefreshOrSetDateToday = ({ onRefresh }) => (
  <ListElement border="">
    <HStack h="100%" justifyContent="space-evenly" w="100%">
      <SetDateTodayButton />
      <RefreshButton onRefresh={onRefresh} />
    </HStack>
  </ListElement>
);

const RefreshButton = ({ onRefresh }) => (
  <HStack
    _hover={{
      textDecoration: 'none',
      color: 'white',
      bg: '#2fe664',
      rounded: 'xl',
      transform: 'scale(1.2)',
    }}
    bg="#19d050"
    gap={0}
    h="60%"
    minW="30%"
    onClick={onRefresh}
    px="10px"
    rounded="xl"
    transitionDuration="0.2s"
    w="auto"
  >
    <Flex aspectRatio={1} h="90%">
      <Refresh color="white" h="100%" py="6px" rounded="xl" w="100%" />
    </Flex>
    <Text color="white" fontSize="1.25rem" whiteSpace="nowrap">
      새로고침
    </Text>
  </HStack>
);

const SetDateTodayButton = () => {
  const setDateToday = useSetRecoilState(setTodayState);
  return (
    <HStack
      _hover={{
        textDecoration: 'none',
        color: 'white',
        bg: '#00d6a4',
        rounded: 'xl',
        transform: 'scale(1.2)',
      }}
      bg="#00c599"
      gap={0}
      h="60%"
      minW="30%"
      onClick={setDateToday}
      px="10px"
      rounded="xl"
      transitionDuration="0.2s"
      w="auto"
    >
      <Flex aspectRatio={1} h="90%">
        <ArrowForward color="white" h="100%" py="6px" rounded="xl" w="100%" />
      </Flex>
      <Text color="white" fontSize="1.25rem" whiteSpace="nowrap">
        오늘로 이동
      </Text>
    </HStack>
  );
};
