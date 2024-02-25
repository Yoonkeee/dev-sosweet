import { Flex, HStack, Text } from '@chakra-ui/react';
import { GetMessageContainer } from '../components/GetMessage';
import { ListContainer } from '../components/List';
import { getHeaderTopPosition } from '../api';

export const GetMessage = () => (
  <ListContainer>
    <Header />
    <GetMessageContainer />
  </ListContainer>
);

const Header = () => (
  <Flex
    bgColor="white"
    borderBottom="5px #1a2a52 solid"
    h="7vh"
    position="sticky"
    px="3%"
    top={getHeaderTopPosition()}
    w="100%"
    zIndex={2}
  >
    <HStack h="100%" w="100%">
      <Text fontSize="xl" px={0} textAlign="center" w="35%">
        이름
      </Text>
      <Text fontSize="xl" lineHeight={1.25} px={0} textAlign="center" w="25%">
        쌓인
        <br />
        내역
      </Text>
      <Text fontSize="xl" lineHeight={1.25} px={0} textAlign="center" w="25%">
        사용
        <br />
        내역
      </Text>
      <Text fontSize="xl" lineHeight={1.25} px={0} textAlign="center" w="25%">
        앨범
      </Text>
    </HStack>
  </Flex>
);
