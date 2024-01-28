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
        <PinInputField ref={pinInputs[0]} color="white" cursor="not-allowed" fontSize="2xl" readOnly />
        <PinInputField ref={pinInputs[1]} color="white" cursor="not-allowed" fontSize="2xl" readOnly />
        <PinInputField ref={pinInputs[2]} color="white" cursor="not-allowed" fontSize="2xl" readOnly />
        <PinInputField ref={pinInputs[3]} color="white" cursor="not-allowed" fontSize="2xl" readOnly />
      </PinInput>
    </HStack>
  );
};
