import { HStack, PinInput, PinInputField } from '@chakra-ui/react';
import { useEffect, useRef } from 'react';

export const PasswordInput = ({ pinLength }) => {
  const pinInputs = [useRef(null), useRef(null), useRef(null), useRef(null)];
  useEffect(() => {
    Array.from(Array(pinLength).keys()).forEach(i => {
      pinInputs[i].current.value = '🐶';
    });
  }, [pinLength]);
  return (
    <HStack h="100%" justifyContent="center" w="100%">
      <PinInput otp placeholder="" size="lg" type="number">
        <PinInputField ref={pinInputs[0]} fontSize="3xl" />
        <PinInputField ref={pinInputs[1]} fontSize="3xl" />
        <PinInputField ref={pinInputs[2]} fontSize="3xl" />
        <PinInputField ref={pinInputs[3]} fontSize="3xl" />
      </PinInput>
    </HStack>
  );
};
