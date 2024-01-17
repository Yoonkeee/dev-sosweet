import { HStack, Text, VStack } from '@chakra-ui/react';
import { useSuspenseQuery } from '@tanstack/react-query';
import DogsListRow from '../components/Rows/DogsListRow';
import { dogsList, getHeaderTopPosition } from '../api';
import { ListContainer } from '../components/List';

export const DogsList = () => {
  const { data, isLoading } = useSuspenseQuery({ queryKey: ['dogs-list'], queryFn: dogsList });
  return (
    <ListContainer>
      <Header />
      {isLoading ? null : data.map(item => <DogsListRow {...item} key={item.name} />)}
    </ListContainer>
  );
};

const Header = () => (
  <VStack
    bgColor="white"
    borderBottom="5px #1a2a52 solid"
    position="sticky"
    px="3%"
    top={getHeaderTopPosition()}
    w="100%"
    zIndex={2}
  >
    <Text fontSize="2xl" fontWeight="extrabold" mt="1vh" textAlign="center">
      🥰쏘스윗 댕댕이 목록🥰
    </Text>
    <HStack h="100%" w="100%">
      <Text fontSize="xl" px={0} textAlign="center" w="50%">
        이름
      </Text>
      <Text fontSize="xl" px={0} textAlign="center" w="35%">
        특이
        <br />
        사항
      </Text>
      <Text fontSize="xl" px={0} textAlign="center" w="15%">
        잔여
        <br />
        시간
      </Text>
    </HStack>
  </VStack>
);
