import { HStack, Text } from '@chakra-ui/react';
import { Temporal } from 'temporal-polyfill';
import { ArrowForward } from '../CustomIcons/ArrowForward';
import { ArrowBackward } from '../CustomIcons/ArrowBackward';

export const DateController = ({ date, onNext, onPrev }) => {
  const formattedDate = Temporal.PlainDate.from(date).toLocaleString('ko-KR', {
    month: 'long',
    day: 'numeric',
    // weekday: 'long',
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
    <HStack h="6vh" justifyContent="center" py="1vh" w="100%">
      <ArrowBackward
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
        isRound
        onClick={() => onPrev()}
        position="inherit"
        rounded="xl"
        transitionDuration="0.2s"
        w="12%"
      />
      <HStack gap={2} marginX="10px">
        <Text fontSize="2xl" fontWeight="900" id="formattedNowDateTimetable" textAlign="center">
          {formattedDate}
        </Text>
        <Text color={dayColor} fontSize="2xl" fontWeight="900" textAlign="center">
          {formattedDay}
        </Text>
      </HStack>
      <ArrowForward
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
        isRound
        onClick={() => onNext()}
        position="inherit"
        rounded="xl"
        transitionDuration="0.2s"
        w="12%"
      />
      {/* <IconButton */}
      {/*  _hover={{ */}
      {/*    textDecoration: 'none', */}
      {/*    color: 'white', */}
      {/*    bg: '#526491', */}
      {/*    rounded: 'xl', */}
      {/*    transform: 'scale(1.2)', */}
      {/*  }} */}
      {/*  aria-label="" */}
      {/*  bg="#1a2a52" */}
      {/*  color="white" */}
      {/*  h="80%" */}
      {/*  icon={<ArrowForwardIcon fontSize="3xl" fontWeight="extrabold" />} */}
      {/*  isRound */}
      {/*  onClick={() => onNext()} */}
      {/*  position="inherit" */}
      {/*  rounded="xl" */}
      {/*  w="6%" */}
      {/* /> */}
    </HStack>
  );
};
