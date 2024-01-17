import { Button } from '@chakra-ui/react';

export const ExitDog = ({ onClick }) => (
  <Button
    _hover={{
      textDecoration: 'none',
      color: 'white',
      bg: '#526491',
      transform: 'scale(1.2)',
    }}
    bg="#1a2a52"
    color="white"
    fontSize="md"
    h="4vh"
    onClick={onClick}
    position="inherit"
    size="md"
    w="80%"
  >
    퇴장
  </Button>
);
