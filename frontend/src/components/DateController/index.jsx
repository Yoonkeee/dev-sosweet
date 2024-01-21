import { Box, Flex, HStack, Text } from '@chakra-ui/react';
import { Temporal } from 'temporal-polyfill';
import { useEffect, useRef, useState } from 'react';
import _ from 'lodash';
import { ArrowForward } from '../CustomIcons/ArrowForward';
import { ArrowBackward } from '../CustomIcons/ArrowBackward';
import { Refresh } from '../CustomIcons/Refresh';

export const DateController = ({ date, onNext, onPrev, onRefresh = null }) => {
  const [displayDay, setDisplayDay] = useState(true);
  const containerRef = useRef(null);
  const elementRef = useRef(null);
  const [threshold, setThreshold] = useState(0);

  const getSize = () => {
    if (!containerRef.current || !elementRef.current) return;
    const containerWidth = containerRef.current.getBoundingClientRect().width;
    const elementWidth = elementRef.current.getBoundingClientRect().width;

    if (displayDay && elementWidth / containerWidth >= 0.57) {
      setDisplayDay(false);
      setThreshold(window.innerWidth);
    }
    if (!displayDay && window.innerWidth > threshold) setDisplayDay(true);
  };

  window.addEventListener('resize', _.debounce(getSize, 200));

  useEffect(() => {
    getSize();
    return window.removeEventListener('resize', getSize);
  }, []);

  return (
    <HStack h="6vh" justifyContent="space-between" px="4%" py="0.5vh" w="100%">
      {onRefresh ? <Box aspectRatio={1} h="100%" /> : null}
      <HStack ref={containerRef} h="100%" justifyContent="center" w="100%">
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
          minW="50px"
          onClick={() => onPrev()}
          position="inherit"
          rounded="xl"
          transitionDuration="0.2s"
          w="10%"
        />
        <DateWithDay date={date} displayDay={displayDay} elementRef={elementRef} />
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
          minW="50px"
          onClick={() => onNext()}
          position="inherit"
          rounded="xl"
          transitionDuration="0.2s"
          w="10%"
        />
      </HStack>
      {onRefresh ? (
        <Flex aspectRatio={1} h="80%">
          <Refresh
            _hover={{
              textDecoration: 'none',
              color: 'white',
              bg: '#2cd65d',
              rounded: 'xl',
              transform: 'scale(1.1)',
            }}
            bg="#19d050"
            color="white"
            h="100%"
            onClick={() => onRefresh()}
            py="6px"
            rounded="xl"
            transitionDuration="0.2s"
            w="100%"
            // w="10%"
          />
        </Flex>
      ) : null}
    </HStack>
  );
};

const DateWithDay = ({ date, displayDay, elementRef }) => {
  const formattedMonthDate = Temporal.PlainDate.from(date).toLocaleString('ko-KR', {
    month: 'long',
    day: 'numeric',
  });
  const formattedMonth = Temporal.PlainDate.from(date).toLocaleString('ko-KR', {
    month: 'long',
  });
  const formattedDate = Temporal.PlainDate.from(date).toLocaleString('ko-KR', {
    day: 'numeric',
  });

  const day = Temporal.PlainDate.from(date).toLocaleString('ko-KR', {
    weekday: 'long',
  });

  let dayColor = '#1a2a52';
  if (day === '금요일') {
    dayColor = '#3063cb';
  } else if (day === '토요일') {
    dayColor = 'blue';
  } else if (day === '일요일') {
    dayColor = 'red';
  }

  return (
    <HStack ref={elementRef} gap={2} marginX="10px">
      <Text display="none" id="formattedNowDateTimetable">
        {formattedMonthDate}
      </Text>
      <HStack gap={0}>
        <Text fontSize="2xl" fontWeight="900" mr="0.25rem" textAlign="center" whiteSpace="nowrap">
          {formattedMonth}
        </Text>
        <Text
          color={displayDay ? 'black' : dayColor}
          fontSize="2xl"
          fontWeight="900"
          textAlign="center"
          whiteSpace="nowrap"
        >
          {formattedDate.slice(0, -1)}
        </Text>
        <Text fontSize="2xl" fontWeight="900" textAlign="center" whiteSpace="nowrap">
          일
        </Text>
      </HStack>
      {displayDay ? (
        <Text color={dayColor} fontSize="2xl" fontWeight="900" textAlign="center" whiteSpace="nowrap">
          {day}
        </Text>
      ) : null}
    </HStack>
  );
};
