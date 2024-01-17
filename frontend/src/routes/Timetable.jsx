import { Flex, VStack } from '@chakra-ui/react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { Container } from '../components/Timetable';
import { DateController } from '../components/DateController';
import { currentDateState, setNextDateState, setPrevDateState } from '../store/store';
import { getHeaderTopPosition } from '../api';

export const Timetable = () => {
  const date = useRecoilValue(currentDateState);
  const setPrevDate = useSetRecoilState(setPrevDateState);
  const setNextDate = useSetRecoilState(setNextDateState);
  return (
    <VStack bgColor="white" minH="80vh" w="100%">
      <Flex
        bgColor="white"
        borderBottom="5px #1a2a52 solid"
        position="sticky"
        top={getHeaderTopPosition()}
        w="100%"
        zIndex={2}
      >
        <DateController date={date} onNext={setNextDate} onPrev={setPrevDate} />
      </Flex>
      <Container />
    </VStack>
  );
};
