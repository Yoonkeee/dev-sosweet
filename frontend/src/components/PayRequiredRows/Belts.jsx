import { Flex, HStack, Text } from '@chakra-ui/react';
import { NameProfileImage } from '../NameWithProfileImage';
import { ListElement } from '../List';

export const Belts = ({ belts, color, name, onClick }) => (
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
      <Text color={color} fontSize="xl" fontWeight="bold" textAlign="right">
        매너벨트 {belts}개
      </Text>
    </HStack>
  </ListElement>
);
