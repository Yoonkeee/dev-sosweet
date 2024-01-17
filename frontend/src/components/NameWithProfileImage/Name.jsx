import { Flex, Text, useDisclosure } from '@chakra-ui/react';
import DogInfoModal from '../../modals/DogInfo';

export const Name = ({ color = '#1a2a52', name }) => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  return (
    <Flex alignItems="center" p={0} textColor="#1a2a52" w="100%">
      <Text
        color={color}
        cursor="pointer"
        fontSize="xl"
        fontWeight={600}
        isTruncated
        lineHeight={1}
        onClick={e => {
          e.stopPropagation();
          onOpen();
        }}
      >
        {name}
      </Text>
      {isOpen ? <DogInfoModal isOpen={isOpen} name={name} onClose={onClose} /> : null}
    </Flex>
  );
};
