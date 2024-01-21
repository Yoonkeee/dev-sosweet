import { HStack, Text } from '@chakra-ui/react';
import { Temporal } from 'temporal-polyfill';
import { ArrowForward } from '../CustomIcons/ArrowForward';
import { ArrowBackward } from '../CustomIcons/ArrowBackward';

export const DateController = ({ date, onNext, onPrev }) => (
  <HStack h="6vh" justifyContent="center" px="4%" py="0.5vh" w="100%">
    <ArrowButton onPrev={onPrev} />
    <DateWithDay date={date} />
    <ArrowButton onNext={onNext} />
  </HStack>
);

const ArrowButton = ({ onNext = null, onPrev = null }) => {
  const Button = onNext ? ArrowForward : ArrowBackward;
  const onClick = onNext || onPrev;
  return (
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
      h="80%"
      minW="50px"
      onClick={onClick}
      position="inherit"
      rounded="xl"
      transitionDuration="0.2s"
      w="10%"
    />
  );
};

const DateWithDay = ({ date }) => {
  const formattedDate = Temporal.PlainDate.from(date).toLocaleString('ko-KR', {
    month: 'long',
    day: 'numeric',
  });
  const formattedDay = Temporal.PlainDate.from(date).toLocaleString('ko-KR', {
    weekday: 'long',
  });

  let dayColor = '#1a2a52';
  if (formattedDay === '금요일') {
    dayColor = '#3063cb';
  } else if (formattedDay === '토요일') {
    dayColor = 'blue';
  } else if (formattedDay === '일요일') {
    dayColor = 'red';
  }

  return (
    <HStack gap={2} marginX="10px">
      <Text
        fontSize="2xl"
        fontWeight="900"
        id="formattedNowDateTimetable"
        textAlign="center"
        whiteSpace="nowrap"
      >
        {formattedDate}
      </Text>
      <Text color={dayColor} fontSize="2xl" fontWeight="900" textAlign="center" whiteSpace="nowrap">
        {formattedDay}
      </Text>
    </HStack>
  );
};
