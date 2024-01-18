import { Checkbox, HStack, Text } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { ListContainer } from '../components/List';
import { getHeaderTopPosition, getPayBeltsRequired, getPayTimeRequired } from '../api';
import { PayBeltsRequiredRow, PayTimeRequiredRow } from '../components/PayRequiredRows';
import AddPay from '../modals/AddPay';

export const PayRequired = () => {
  const [timeChecked, setTimeChecked] = useState(true);
  const [beltsChecked, setBeltsChecked] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const onClick = clickedName => {
    setName(clickedName);
    setIsOpen(true);
  };
  const onClose = () => {
    setIsOpen(false);
    setName('');
  };
  const beltColor = '#556eff';
  const timeColor = '#ff7f50';

  const { data: payTimeRequired } = useQuery({
    queryKey: ['getPayTimeRequired'],
    queryFn: getPayTimeRequired,
  });
  const { data: payBeltsRequired } = useQuery({
    queryKey: ['getPayBeltsRequired'],
    queryFn: getPayBeltsRequired,
  });

  return (
    <ListContainer>
      <Header>
        <Checkbox h="100%" isChecked={timeChecked} onChange={() => setTimeChecked(prev => !prev)} size="xl">
          <Text color={timeColor} fontSize="xl">
            시간 초과
          </Text>
        </Checkbox>
        <Checkbox h="100%" isChecked={beltsChecked} onChange={() => setBeltsChecked(prev => !prev)} size="xl">
          <Text color={beltColor} fontSize="xl">
            벨트 사용
          </Text>
        </Checkbox>
      </Header>
      {timeChecked &&
        payTimeRequired &&
        payTimeRequired.map(item => (
          <PayTimeRequiredRow key={item.name} color={timeColor} onClick={onClick} {...item} />
        ))}
      {beltsChecked &&
        payBeltsRequired &&
        payBeltsRequired.map(item => (
          <PayBeltsRequiredRow key={item.name} color={beltColor} onClick={onClick} {...item} />
        ))}
      {name !== '' && <AddPay initName={name} isOpen={isOpen} onClose={onClose} />}
    </ListContainer>
  );
};

const Header = ({ children }) => (
  <HStack
    bgColor="white"
    borderBottom="5px #1a2a52 solid"
    h="7vh"
    justifyContent="space-between"
    position="sticky"
    px="10%"
    top={getHeaderTopPosition()}
    w="100%"
    zIndex={2}
  >
    {children}
  </HStack>
);
