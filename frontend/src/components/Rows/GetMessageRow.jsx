import { Flex, HStack, Text, Button } from '@chakra-ui/react';
import { NameProfileImage } from '../NameWithProfileImage';

const GetMessageRow = ({ count, name, onClick, url }) => {
  const fontColor = true > 0 ? '#1a2a52' : '#ff7f50';
  const countColor = count > 15 ? 'red' : fontColor;
  const countSize = count > 15 ? '2xl' : 'xl';
  const countWeight = count > 15 ? 'black' : 'bold';

  return (
    <HStack h="100%" justifyContent="space-between" w="100%">
      <Flex h="100%" p={0} textAlign="center" w="30%">
        <NameProfileImage color={fontColor} name={name} />
      </Flex>
      <HStack cursor="pointer" h="100%" w="70%">
        <Flex w="100%" display="flex" justifyContent="center" align="center">
          <CustomLayout>
            <Text fontSize={countSize} fontWeight={countWeight} textColor={countColor}>
              {count}
            </Text>
          </CustomLayout>
          <Buttons url={url} />
        </Flex>
      </HStack>
    </HStack>
  );
};

const Buttons = ({ url }) => (
  <>
    <CustomLayout>
      <Button
        _hover={{
          textDecoration: 'none',
          color: 'white',
          transform: 'scale(1.2)',
        }}
        size="sm"
        w="100%"
        h="3.5vh"
        fontSize="lg"
        colorScheme="twitter"
      >
        보기
      </Button>
    </CustomLayout>
    <CustomLayout>
      {url ? (
        <Link to={url}>
          <Button
            _hover={{
              textDecoration: 'none',
              color: 'white',
              transform: 'scale(1.2)',
            }}
            bgColor="#1a2a52"
            color="white"
            size="sm"
            fontSize="lg"
            h="3.5vh"
            w="100%"
          >
            앨범
          </Button>
        </Link>
      ) : (
        <Button
          _hover={{
            textDecoration: 'none',
            color: 'white',
            transform: 'scale(1.2)',
          }}
          bgColor="#ff958a"
          color="white"
          size="sm"
          fontSize="lg"
          h="3.5vh"
          w="100%"
        >
          등록
        </Button>
      )}
    </CustomLayout>
  </>
);

const CustomLayout = ({ onClick, children }) => (
  <Flex w="33%" display="flex" justifyContent="center" align="center" onClick={onClick}>
    <Flex
      alignContent="center"
      justifyContent="center"
      ml="5%"
      px={0}
      textAlign="center"
      w="calc(min(1rem + 8vw, 3rem))"
    >
      {children}
    </Flex>
  </Flex>
);

export default GetMessageRow;
