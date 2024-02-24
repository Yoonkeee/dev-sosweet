import { Flex, HStack, Text } from '@chakra-ui/react';
import { formatMinuteToTime } from '../../api';
import { NameProfileImage } from '../NameWithProfileImage';
import { ListElement } from '../List';

const AlbumListRow = ({ name, onClick, hasAlbum = true, children }) => {
  return (
    <ListElement height="2rem">
      <Flex h="100%" p={0} textAlign="center" w="45%">
        <NameProfileImage name={name} showAllergy={false} />
      </Flex>
      <HStack
        alignItems="center"
        cursor="pointer"
        fontFamily="Pretendard"
        fontSize="calc(min(0.5rem + 2.5vw, 1.25rem))"
        justifyContent="flex-end"
        onClick={() => onClick(name)}
        pr={8}
        textAlign="center"
        w="55%"
      >
        {children}
      </HStack>
    </ListElement>
  );
};

export default AlbumListRow;
