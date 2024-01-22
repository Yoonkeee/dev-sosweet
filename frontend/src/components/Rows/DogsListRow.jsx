import { Flex, HStack, Text, useDisclosure } from '@chakra-ui/react';
import { formatMinuteToTime } from '../../api';
import DogInfo from '../../modals/DogInfo';
import { NameProfileImage } from '../NameWithProfileImage';

const DogsListRow = ({ name, note, remaining_minutes: remainingMinutes }) => {
  const formattedDuration = formatMinuteToTime(remainingMinutes);
  const textColor = remainingMinutes < 0 ? '#ff7f50' : '#1a2a52';
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <HStack gap={0} h="90px" justifyContent="space-between" w="100%">
      <Flex h="100%" p={0} textAlign="center" w="50%">
        <NameProfileImage color={textColor} name={name} />
      </Flex>
      <HStack cursor="pointer" gap={0} h="100%" onClick={onOpen} w="50%">
        <Text fontSize="md" fontWeight="semibold" textAlign="center" w="70%">
          {note}
        </Text>
        <Text
          fontSize="md"
          fontWeight="semibold"
          textAlign="center"
          textColor={textColor}
          w="30%"
          whiteSpace="break-spaces"
        >
          {formattedDuration}
        </Text>
        {isOpen ? <DogInfo isOpen={isOpen} name={name} onClose={onClose} /> : null}
      </HStack>
    </HStack>
  );
};

export default DogsListRow;
