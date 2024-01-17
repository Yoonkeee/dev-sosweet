import { Button, Heading, Image, Text, VStack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import 프로티콘 from '../../public/logo/프로티콘.png';

export const NotFound = () => (
  <VStack bg="gray.100" minH="100vh">
    <Image h="30vh" mt="5vh" rounded="2xl" src={프로티콘} />
    <VStack textAlign="center">
      <Heading>헉 여기는 에러 페이지에요😭</Heading>
      <Text>여기가 어디죠..?ㅜㅜ</Text>
      <Text>그대신 귀여운 🥰프로🥰 사진을 보여드릴게요!</Text>
      <Text>
        자꾸 에러가 발생하면 자세한 상황을
        <br />
        프로아빠에게 문의해주세요!🙏
      </Text>
      <Link to="/">
        <Button colorScheme="twitter" variant="solid">
          &larr; 돌아가주세요...😢
        </Button>
      </Link>
    </VStack>
  </VStack>
);
