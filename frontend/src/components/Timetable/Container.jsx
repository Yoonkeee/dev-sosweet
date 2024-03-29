import { VStack } from '@chakra-ui/react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useRecoilValue } from 'recoil';
import { getCheckoutTimetable, getTimeTable } from '../../api';
import { currentDateState } from '../../store/store';
import CheckoutTimetableRow from '../Rows/CheckoutTimetableRow';
import TimetableRow from '../Rows/TimetableRow';
import { RefreshOrSetDateToday } from '../Rows/RefreshOrSetDateToday';

export const Container = ({ onRefresh }) => {
  const date = useRecoilValue(currentDateState);
  const { isLoading: isCheckoutTableLoading, data: checkoutData } = useSuspenseQuery({
    queryKey: ['checkoutTimetable', date],
    queryFn: getCheckoutTimetable,
  });
  const { data: timetableData } = useSuspenseQuery({
    queryKey: ['timetable', date],
    queryFn: getTimeTable,
  });

  return (
    <VStack w={'100%'} minH={'80vh'}>
      {timetableData?.map(item => (
        <TimetableRow key={item.id} {...item} />
      ))}
      {checkoutData?.map(item => (
        <CheckoutTimetableRow key={item.id} {...item} />
      ))}
      <RefreshOrSetDateToday onRefresh={onRefresh} />
    </VStack>
  );
};
