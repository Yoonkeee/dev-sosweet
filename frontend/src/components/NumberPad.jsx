import { Box, Button, IconButton, SimpleGrid, Text } from '@chakra-ui/react';
import { ArrowBackward } from './CustomIcons/ArrowBackward';

export const NumberPad = ({ onDelete, onInput }) => {
  const onClick = number => onInput(number);
  const numbers = Array.from({ length: 9 }, (_, i) => i + 1);
  numbers.push(null, 0);
  return (
    <SimpleGrid columns={3} h="100%" w="100%">
      {numbers.map(i => (
        <NumberElement key={i} number={i} onClick={onClick} />
      ))}
      <DeleteElement onClick={onDelete} />
    </SimpleGrid>
  );
};

const NumberElement = ({ number, onClick }) =>
  Number.isInteger(number) ? (
    <Box aspectRatio={1} h="100%" p="10%">
      <Button
        _hover={{ textDecoration: 'none', color: 'white', rounded: 'full', transform: 'scale(1.1)' }}
        aspectRatio={1}
        bg="#1a2a52"
        border="2px solid white"
        color="white"
        fontSize="2xl"
        fontWeight="bold"
        h="100%"
        onClick={() => onClick(number)}
        p={0}
        rounded="full"
        w="100%"
      >
        <Text>{number}</Text>
      </Button>
    </Box>
  ) : (
    <div />
  );

const DeleteElement = ({ onClick }) => (
  <Box aspectRatio={1} h="100%" p="10%">
    <IconButton
      _hover={{ textDecoration: 'none', color: 'white', rounded: 'full', transform: 'scale(1.1)' }}
      aria-label="Backspace"
      bg="#1a2a52"
      border="2px solid white"
      color="white"
      fontSize="3xl"
      h="100%"
      icon={<ArrowBackward boxSize={8} />}
      onClick={onClick}
      p={0}
      rounded="full"
      w="100%"
    />
  </Box>
);
