import { useRecoilState, useSetRecoilState } from 'recoil';
import { Box, Flex, HStack, Image, Text, useMediaQuery, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import {
  authenticationAtom,
  authFailureAtom,
  failureIntervalIdAtom,
  wrongStackAtom,
} from '../store/authentication';
import LogoDog from '../../public/logo/logo_dog.png';
import LogoWord from '../../public/logo/logo_word.png';
import { NumberPad } from '../components/NumberPad';
import { PasswordInput } from '../components/PasswordInput';
import { getDateDistance, getDateDistanceText } from '@toss/date';

export const Authentication = () => {
  const setAuthorized = useSetRecoilState(authenticationAtom);
  const [failure, setFailure] = useRecoilState(authFailureAtom);
  const [wrongStack, setWrongStack] = useRecoilState(wrongStackAtom);
  const [intervalId, setIntervalId] = useRecoilState(failureIntervalIdAtom);
  const [pin, setPin] = useState([]);
  const [text, setText] = useState('비밀번호를 입력해주세요.');
  const [color, setColor] = useState('white');
  const [timeoutId, setTimeoutId] = useState(0);
  const [remainingTime, setRemainingTime] = useState('initialized');
  const [isLogoVisible] = useMediaQuery('(min-height: 800px)');

  const resetAuthFailureAtom = () => setFailure({ status: false, enableOn: null });
  const resetWrongStackAtom = () => setWrongStack(0);

  const onInput = number => setPin([...pin, number]);
  const onDelete = () => {
    if (pin.length === 0) return;
    setPin(pin.slice(0, -1));
  };

  const resetPin = () => setPin([]);
  const resetText = () => {
    setText('비밀번호를 입력해주세요.');
    setColor('white');
  };
  const wrongPin = () => {
    setWrongStack(prev => prev + 1);
    resetPin();
  };

  useEffect(() => {
    if (wrongStack === 0) return;
    if (wrongStack >= 5) return lockAuthentication();
    const status =
      wrongStack >= 3 ? (
        <>
          비밀번호가 {wrongStack}회 틀렸습니다.
          <br />
          5회 틀릴 경우 사용할 수 없습니다.
        </>
      ) : (
        `비밀번호가 ${wrongStack}회 틀렸습니다.`
      );
    setText(status);
    setTimeoutId(setTimeout(() => resetText(), 3000));
    setColor('red');
  }, [wrongStack]);

  const lockAuthentication = () => {
    const enableTime = new Date(Date.now() + 1000 * 60 * 3 + 500);
    const remaining = () => getDateDistance(new Date(), enableTime);
    setRemainingTime(getDateDistanceText(remaining()));
    setFailure({ status: true, enableOn: enableTime });
    setWrongStack(1);

    const id = setInterval(() => {
      setRemainingTime(getDateDistanceText(remaining()));
    }, 1000);
    setIntervalId(id);
  };

  useEffect(() => {
    if (wrongStack && remainingTime === '') unlock(intervalId);
  }, [remainingTime]);

  useEffect(() => {
    if (failure.status) {
      if (getDateDistanceText(getDateDistance(new Date(), new Date(failure.enableOn))) !== '') {
        clearInterval(intervalId);
        setRemainingTime(getDateDistanceText(getDateDistance(new Date(), new Date(failure.enableOn))));
        const id = setInterval(() => {
          setRemainingTime(getDateDistanceText(getDateDistance(new Date(), new Date(failure.enableOn))));
        }, 1000);
        setIntervalId(id);
      } else {
        unlock(0);
      }
    }
  }, []);

  const unlock = intervalId => {
    clearInterval(intervalId);
    resetText();
    resetAuthFailureAtom();
    if (intervalId) resetWrongStackAtom();
  };

  const checkPin = () => {
    clearTimeout(timeoutId);
    try {
      const pinNumber = pin.join('');
      if (pinNumber === '0000') authorized();
      else wrongPin();
    } catch {
      wrongPin();
    }
  };

  const authorized = () => {
    // success
    setAuthorized(true);
    resetAuthFailureAtom();
    resetWrongStackAtom();
  };

  useEffect(() => {
    if (pin.length === 4) checkPin();
    else if (pin.length > 4) resetPin();
  }, [pin]);

  return (
    <VStack alignContent="center" bgColor="#1a2a52" h="100vh" minH="100vh" pt={'2vh'} w="100%">
      <HStack h={'16%'} gap={0}>
        {isLogoVisible ? (
          <>
            <Image filter="invert(1)" src={LogoDog} h={'80%'} />
            <Image filter="invert(1)" src={LogoWord} h={'50%'} />
          </>
        ) : null}
      </HStack>
      {failure.status ? (
        <Locked remainingTime={remainingTime} />
      ) : (
        <VStack
          w={'100%'}
          h={isLogoVisible ? '80%' : '100%'}
          mb={isLogoVisible ? null : '10vh'}
          justifyContent={'flex-start'}
        >
          <Flex h="15%" w="50%">
            <PasswordInput pinLength={pin.length} />
          </Flex>
          <Text
            color={color}
            fontFamily="GmarketSans"
            textAlign="center"
            fontSize="xl"
            h={'5%'}
            fontWeight={500}
            mb="2vh"
          >
            {text}
          </Text>
          <VStack w="80%" h={'80%'} gap={0}>
            <NumberPad onInput={onInput} onDelete={onDelete} />
          </VStack>
        </VStack>
      )}
    </VStack>
  );
};

const Locked = ({ remainingTime }) => {
  return (
    <VStack
      alignContent="center"
      bgColor="#1a2a52"
      minH="100vh"
      fontFamily="GmarketSans"
      textAlign="center"
      fontSize="xl"
      h={'10vh'}
      fontWeight={500}
      mb="2vh"
      py="4vh"
      w="100%"
    >
      <Text color={'red'}>비밀번호를 5회 틀렸습니다.</Text>
      <HStack>
        <Text color={'white'}>{remainingTime}</Text>
        <Text color={'red'}>후에 다시 시도해주세요.</Text>
      </HStack>
    </VStack>
  );
};
