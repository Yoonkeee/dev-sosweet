import { Flex, HStack, Select, Text, useToast, VStack } from '@chakra-ui/react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import HistoryRow from '../components/Rows/HistoryRow.jsx';
import { dogsList, getHeaderTopPosition, getHistory } from '../api';
import { ListElement } from '../components/List';

export const History = () => {
  const toast = useToast();
  const queryClient = useQueryClient();
  const { isLoading: selectIsLoading, data: selectData } = useQuery({
    queryKey: ['dogs-list'],
    queryFn: dogsList,
  });
  const [name, setName] = useState('ALL');
  const { isLoading, data } = useQuery({ queryKey: ['history', name], queryFn: getHistory });
  const mutation = useMutation({
    mutationFn: getHistory,
    onSuccess: response => {
      toast({
        title: (
          <>
            {name}의 이용 내역을 불러왔어요! <br />
          </>
        ),
        status: 'success',
        position: 'top',
        duration: 800,
        isClosable: true,
      });
    },
  });
  const options =
    selectData &&
    selectData?.map(item => ({
      value: item.name,
      label: item.name,
    }));
  // if Select option is changed, set mutation

  useEffect(() => {
    if (name) {
      queryClient.refetchQueries({ queryKey: ['history', name] });
      // mutation.mutate(name);
    }
  }, [name]);
  const onNameChange = e => {
    if (e.target.value === '') {
      setName('ALL');
      queryClient.refetchQueries({ queryKey: ['history', name] });
    } else {
      document.getElementById('name').style.position = 'inherit';
      setName(prev => e.target.value);
    }
  };
  return (
    <VStack bgColor="white" minH="80vh" pb="2vh" w="100%">
      <Flex
        bgColor="white"
        borderBottom="5px #1a2a52 solid"
        h="8vh"
        position="sticky"
        px="3%"
        top={getHeaderTopPosition()}
        w="100%"
        zIndex={2}
      >
        <HStack h="100%" w="100%" gap={0}>
          <Flex fontSize="xl" px={0} textAlign="center" w="50%">
            {selectIsLoading ? (
              <Text>Loading...</Text>
            ) : (
              <Select
                css={{ WebkitPaddingEnd: 0, WebkitPaddingStart: 10 }}
                icon={<></>}
                id="name"
                mr={5}
                onChange={onNameChange}
                paddingInlineEnd={0}
                paddingInlineStart={0}
                placeholder="댕댕이 선택"
                position="inherit"
                px={0}
                required
                w="100%"
              >
                {options
                  ? options.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))
                  : null}
              </Select>
            )}
          </Flex>
          <Text fontSize="lg" lineHeight={1.25} px={0} textAlign="center" w="30%">
            이용
            <br />
            내역
          </Text>
          <Text fontSize="lg" lineHeight={1.25} px={0} textAlign="center" w="20%">
            매너
            <br />
            벨트
          </Text>
        </HStack>
      </Flex>
      {data
        ? data.map(item => (
            <ListElement key={item.id}>
              <HistoryRow data={item} />
            </ListElement>
          ))
        : null}
    </VStack>
  );
};
