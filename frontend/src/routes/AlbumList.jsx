import { HStack, Text } from '@chakra-ui/react';
import { AlbumLilstContainer } from '../components/AlbumLIst/Container';
import { ListContainer } from '../components/List';
import { getHeaderTopPosition, getPayBeltsRequired, getPayTimeRequired } from '../api';

export const AlbumList = () => {
  return (
    <>
      <ListContainer>
        <Header />
        <AlbumLilstContainer />
      </ListContainer>
    </>
  );
};

const Header = () => {
  return (
    <HStack
      bgColor="white"
      borderBottom="5px #1a2a52 solid"
      h="7vh"
      justifyContent="space-between"
      position="sticky"
      px="10%"
      top={getHeaderTopPosition()}
      w="100%"
      zIndex={2}
    >
      <Text fontSize="xl">이름</Text>
      <Text fontSize="xl" mr="7vh">
        앨범
      </Text>
    </HStack>
  );
};
