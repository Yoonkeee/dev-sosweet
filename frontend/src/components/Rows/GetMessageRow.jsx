import { Flex, HStack, Text } from '@chakra-ui/react';
import { formatMinuteToTime } from '../../api';
import { NameProfileImage } from '../NameWithProfileImage';

const GetMessageRow = ({ count, name, onClick, remainingMinutes }) => {
  const fontColor = remainingMinutes > 0 ? '#1a2a52' : '#ff7f50';
  const countColor = count > 15 ? 'red' : fontColor;
  const countSize = count > 15 ? '2xl' : 'xl';
  const countWeight = count > 15 ? 'black' : 'bold';

  return (
    <HStack h="100%" justifyContent="space-between" w="100%">
      <Flex h="100%" p={0} textAlign="center" w="50%">
        <NameProfileImage color={fontColor} name={name} />
      </Flex>
      <HStack cursor="pointer" h="100%" onClick={onClick} w="50%">
        <Text fontSize={countSize} fontWeight={countWeight} textAlign="center" textColor={countColor} w="50%">
          {count}
        </Text>
        <Text fontSize="xl" fontWeight="bold" textAlign="center" textColor={fontColor} w="50%">
          {formatMinuteToTime(remainingMinutes)}
        </Text>
      </HStack>
    </HStack>
  );
};

export default GetMessageRow;
