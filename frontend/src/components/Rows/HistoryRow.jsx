import { Flex, HStack, Text, useDisclosure, VStack } from '@chakra-ui/react';
import ModifyHistory from '../../modals/ModifyHistory';
import { strToLocaleWithoutWeekday } from '../../api';
import { NameProfileImage } from '../NameWithProfileImage';

const HistoryRow = props => {
  const formatDate = dateStr => strToLocaleWithoutWeekday(dateStr);
  const { belts, date, in_time, name, out_time } = props.data;
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <HStack h="100%" justifyContent="space-between" w="100%">
      <Flex h="100%" p={0} textAlign="center" w="50%">
        <NameProfileImage name={name} />
      </Flex>
      <HStack cursor="pointer" h="100%" justifyContent="space-between" onClick={onOpen} w="50%">
        {/* <VStack alignItems="center" gap={0} h="100%" justifyContent="center" w="80%"> */}
        <Text fontSize="sm" fontWeight="bold" textAlign="center" textColor="#1a2a52" w="60%">
          {`${formatDate(date)}`}
          <br />
          {`${in_time}~${out_time}`}
        </Text>
        {/* </VStack> */}
        {belts > 0 ? (
          <Text fontSize="lg" fontWeight="bold" textAlign="center" textColor="red" w="20%">
            {belts}
          </Text>
        ) : (
          ''
        )}
      </HStack>
      {isOpen ? <ModifyHistory {...props.data} isOpen={isOpen} onClose={onClose} /> : null}
    </HStack>
  );
};

export default HistoryRow;
