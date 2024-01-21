import { CircularProgress, Flex, Text, useToast, VStack } from '@chakra-ui/react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useEffect, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Container } from '../components/Timetable';
import { DateController } from '../components/DateController';
import { currentDateState, setNextDateState, setPrevDateState } from '../store/store';
import { getHeaderTopPosition, notOutTimetable, strToLocaleWithoutWeekday } from '../api';

export const Timetable = () => {
  const date = useRecoilValue(currentDateState);
  const setPrevDate = useSetRecoilState(setPrevDateState);
  const setNextDate = useSetRecoilState(setNextDateState);
  const [isRendered, setIsRendered] = useState(true);
  const queryClient = useQueryClient();
  const { data: notOutData } = useQuery({ queryKey: ['notOut'], queryFn: notOutTimetable });
  const onRefresh = () => setIsRendered(false);

  useEffect(() => {
    if (!isRendered) {
      window.scrollTo(0, 0);
      setTimeout(() => setIsRendered(true), 300);
    }
  }, [isRendered]);

  const toast = useToast();
  const createNotOutDogsToast = () => {
    if (notOutData && notOutData.length > 0) {
      if (toast.isActive('notOutDogs')) return;

      toast({
        title: '체크아웃 하지 않은 댕댕이가 있습니다.',
        description:
          notOutData &&
          notOutData.map(notOut => (
            <Text key={notOut.id}>
              {strToLocaleWithoutWeekday(notOut.date)} {notOut.name}
            </Text>
          )),
        colorScheme: 'red',
        duration: 1500,
        isClosable: true,
        position: 'top',
        id: 'notOutDogs',
      });
    }
  };

  useEffect(() => {
    queryClient.refetchQueries({ queryKey: ['notOut'] });
    window.scrollTo(0, 0);
    createNotOutDogsToast();
  }, [date]);

  useEffect(() => {
    queryClient.refetchQueries({ queryKey: ['notOut'] });
  }, []);

  useEffect(() => {
    createNotOutDogsToast();
  }, [notOutData]);

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
        <DateController date={date} onNext={setNextDate} onPrev={setPrevDate} onRefresh={onRefresh} />
      </Flex>
      {isRendered ? <Container onRefresh={onRefresh} /> : <SpinnerOnRefresh />}
    </VStack>
  );
};

const SpinnerOnRefresh = () => (
  <Flex h="100%" justifyContent="center" pt="10vh" w="100%">
    <CircularProgress color="green.300" isIndeterminate size="100px" thickness="14px" />
  </Flex>
);
