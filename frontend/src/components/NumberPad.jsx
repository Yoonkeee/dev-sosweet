import { Button, Flex, IconButton, SimpleGrid, Text } from '@chakra-ui/react';
import { ArrowBackward } from './CustomIcons/ArrowBackward';

export const NumberPad = ({ onDelete, onInput }) => {
  const onClick = number => onInput(number);
  const numbers = Array.from({ length: 9 }, (_, i) => i + 1);
  numbers.push(null, 0);
  return (
    <SimpleGrid
      alignItems="center"
      columns={3}
      h="100%"
      justifyItems="center"
      maxH="500px"
      maxW="400px"
      w="90%"
    >
      {numbers.map(i => (
        <NumberElement key={i} number={i} onClick={onClick} />
      ))}
      <DeleteElement onClick={onDelete} />
    </SimpleGrid>
  );
};

const NumberElement = ({ number, onClick }) =>
  Number.isInteger(number) ? (
    <Flex
      alignItems="center"
      aspectRatio={1}
      h="100%"
      justifyContent="center"
      maxH="120px"
      maxW="120px"
      p="10%"
      w="100%"
    >
      <Button
        _hover={{ textDecoration: 'none', color: 'white', rounded: 'full', transform: 'scale(1.1)' }}
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
    </Flex>
  ) : (
    <Flex aspectRatio={1} h="90%" maxH="130px" p="10%" />
  );

const DeleteElement = ({ onClick }) => (
  <Flex
    alignItems="center"
    aspectRatio={1}
    h="100%"
    justifyContent="center"
    maxH="120px"
    maxW="120px"
    p="10%"
    w="100%"
  >
    <IconButton
      _hover={{ textDecoration: 'none', color: 'white', rounded: 'full', transform: 'scale(1.1)' }}
      aria-label="Backspace"
      aspectRatio={1}
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
  </Flex>
);
