import { Flex, HStack, Text } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { getHeaderTopPosition, getPayHistory } from '../api';
import PayHistoryRow from '../components/Rows/PayHistoryRow';
import { ListContainer } from '../components/List';

export const PayHistory = () => {
  const { data } = useQuery({ queryKey: ['getPayHistory'], queryFn: getPayHistory });
  // const mutation = useMutation(getPayHistory, {
  //   onSuccess: (response) => {
  //     toast({
  //       title: (
  //         <>
  //           {name}의 이용 내역을 불러왔어요! <br/>
  //         </>),
  //       status: "success",
  //       position: "top",
  //       duration: 3000,
  //       isClosable: true,
  //     });
  //     // console.log(response);
  //   },
  // });
  // const options = selectData?.map(item => ({
  //   value: item.name,
  //   label: item.name,
  // }));
  // if Select option is changed, set mutation
  // useEffect(() => {
  //   if (name) {
  //     console.log('mutated '+name);
  //     queryClient.refetchQueries(["getPayHistory", name]);
  //     // mutation.mutate(name);
  //   }
  // }, [name]);

  return (
    <ListContainer>
      <Header />
      {data && data.map(item => <PayHistoryRow key={item.id} {...item} />)}
    </ListContainer>
  );
};

const Header = () => (
  <Flex
    bgColor="white"
    borderBottom="5px #1a2a52 solid"
    h="7vh"
    position="sticky"
    px="3%"
    top={getHeaderTopPosition()}
    w="100%"
    zIndex={2}
  >
    <HStack h="100%" w="100%">
      <Text fontSize="xl" px={0} textAlign="center" w="50%">
        댕댕이
      </Text>
      <Text fontSize="xl" px={0} textAlign="center" w="25%">
        결제
        <br />
        시간
      </Text>
      <Text fontSize="xl" px={0} textAlign="center" w="25%">
        결제일
      </Text>
    </HStack>
  </Flex>
);
