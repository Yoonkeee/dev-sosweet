import { Flex, Text, useDisclosure } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { getAllergy } from '../../api';
import DogInfoModal from '../../modals/DogInfo';

export const Allergy = ({ fontSize = 0.9, name }) => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { data } = useQuery({
    queryKey: ['allergy', name],
    queryFn: getAllergy,
  });

  return (
    <Flex justifyContent="flex-start" w="100%">
      <Text color="red" cursor="pointer" fontSize={`${fontSize}rem`} fontWeight={400} onClick={onOpen}>
        {data}
      </Text>
      {isOpen ? <DogInfoModal isOpen={isOpen} name={name} onClose={onClose} /> : null}
    </Flex>
  );
};
