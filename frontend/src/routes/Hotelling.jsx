import { Button, Text, VStack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

export const Hotelling = () => (
  <VStack bg="gray.100" minH="100vh" w="100%">
    <Text fontSize="xl" mb="5vh" mt="20vh" textAlign="center" w="100%">
      호텔링 서비스는 아직 준비중입니다.
    </Text>
    <Link to="/">
      <Button colorScheme="twitter" variant="solid">
        &larr; 돌아가주세요...😢
      </Button>
    </Link>
  </VStack>
);
