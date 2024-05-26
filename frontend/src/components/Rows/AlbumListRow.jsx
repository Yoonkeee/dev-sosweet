import { Flex, HStack, Text } from '@chakra-ui/react';
import { formatMinuteToTime } from '../../api';
import { NameProfileImage } from '../NameWithProfileImage';
import { ListElement } from '../List';

export const AlbumListRow = ({ name, onClick, hasAlbum = true, children }) => {
  return (
    <ListElement height="2rem" px="10%">
      <Flex h="100%" p={0} textAlign="center" w="30%">
        <NameProfileImage name={name} showAllergy={false} />
      </Flex>
      <HStack
        alignItems="center"
        cursor="pointer"
        fontFamily="Pretendard"
        fontSize="calc(min(0.5rem + 2.5vw, 1.25rem))"
        justifyContent="flex-end"
        onClick={onClick}
        pr={8}
        textAlign="center"
        w="60%"
        h={'100%'}
      >
        {children}
      </HStack>
    </ListElement>
  );
};
