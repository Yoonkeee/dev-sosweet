import { Flex, HStack, Text, useDisclosure } from '@chakra-ui/react';
import ModifyPay from '../../modals/ModifyPay';
import { strToLocaleWithoutWeekday } from '../../api';
import { NameProfileImage } from '../NameWithProfileImage';

const PayHistoryRow = ({ date, id, minutes, name }) => {
  const formatDate = dateStr => strToLocaleWithoutWeekday(dateStr);
  const { isOpen, onClose, onOpen } = useDisclosure();
  return (
    <HStack cursor="pointer" gap={0} h="100%" onClick={onOpen} px="2%" w="100%">
      <Flex h="100%" maxH="60px" p={0} textAlign="center" w="50%">
        <NameProfileImage name={name} />
      </Flex>
      <Flex h="100%" justifyContent="center" p={0} textAlign="center" w="25%">
        <Text fontSize="lg" fontWeight="bold" textAlign="center" textColor="#1a2a52">
          {Math.floor(minutes / 60)}시간
        </Text>
      </Flex>
      <Flex h="100%" justifyContent="center" p={0} textAlign="center" w="25%">
        <Text fontSize="md" fontWeight="bold" textAlign="center" textColor="#1a2a52">
          {formatDate(date)}
        </Text>
      </Flex>
      {isOpen ? <ModifyPay {...{ date, minutes, name, id }} isOpen={isOpen} onClose={onClose} /> : null}
    </HStack>
  );
};

export default PayHistoryRow;
