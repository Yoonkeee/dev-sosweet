import { AspectRatio, Box, Button, HStack, Image, Text, useDisclosure, VStack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import 박하로 from '../../public/logo/haro.webp';
import 박프로 from '../../public/logo/park-pro.webp';
import 프로1 from '../../public/logo/pro1.png';
import 프로2 from '../../public/logo/pro2.png';
import 프로3 from '../../public/logo/pro3.png';
import 프로4 from '../../public/logo/pro4.png';
import 프로5 from '../../public/logo/pro5.png';
import 프로6 from '../../public/logo/pro6.png';
import 프로8 from '../../public/logo/pro8.png';
import { mainColor } from '../api';
import ModifyDog from '../modals/ModifyDog';

export const Home = () => (
  <VStack bgColor="gray.200" minH="80vh" paddingTop="2.5vh" pb={0} pt="2vh" px="2%" w="100%">
    {/*  ROW 1  */}
    <HStack alignContent="center" alignItems="center" justifyContent="center" px="2%" w="100%">
      {/*  LEFT  */}
      <HomeSquareBox image={박프로} letterColor="#752D2A" link="/hotelling" title="호텔링" />
      {/*  RIGHT  */}
      <HomeSquareBox image={박하로} letterColor="#ffffff" link="/timetable" title="놀이방" />
    </HStack>
    {/*  ROW 2  */}
    <HStack alignContent="center" alignItems="center" justifyContent="center" px="2%" w="100%">
      {/*  LEFT  */}
      <HomeSquareBox
        bgColor="#FEBE8C"
        image={프로4}
        letterColor="#1F7480"
        link="/dogs-list"
        title="🐶 목록"
      />
      {/*  RIGHT  */}
      <HomeSquareBox bgColor="#95BDFF" image={프로3} letterColor="white" link="/get-message" title="메세지" />
    </HStack>
    {/*  ROW 3  */}
    <HStack alignContent="center" alignItems="center" justifyContent="center" px="2%" w="100%">
      {/*  LEFT  */}
      <HomeRectBoxTwoByOneModal
        bgColor="#FFF6BD"
        component={ModifyDog}
        image={프로6}
        letterColor="#4B437D"
        title="🐶 수정"
      />
      {/*  RIGHT  */}
      <HomeRectBoxTwoByOne
        bgColor="#F7C8E0"
        image={프로2}
        letterColor="white"
        link="/pay-history"
        title="결제 내역"
      />
    </HStack>
    {/*  ROW 4  */}
    <HStack alignContent="center" alignItems="center" justifyContent="center" px="2%" w="100%">
      {/*  LEFT  */}

      <HomeRectBoxTwoByOne
        ml={50}
        bgColor="#ffa29a"
        image={프로8}
        letterColor="#FFFFDF"
        link="/product"
        title="상품관리"
      />
      {/*  RIGHT  */}
      <HomeRectBoxTwoByOne
        bgColor={mainColor}
        image={프로5}
        letterColor="white"
        link="/pay-required"
        title="결제필요"
      />
    </HStack>

    <HStack align="center" justify="center" px="2%" w="100%">
      <AspectRatio maxW="250px" ratio={2} rounded="1rem" w="50%">
        <></>
      </AspectRatio>
      <HomeRectBoxTwoByOne
        bgColor="#DFFFD8"
        image={프로1}
        letterColor={mainColor}
        link="/history"
        title="이용 내역"
      />
    </HStack>
  </VStack>
);

const HomeSquareBox = props => (
  <AspectRatio border={`2px solid ${mainColor}`} maxW="250px" ratio={1} rounded="1rem" w="50%">
    <Link h="100%" to={props.link} w="100%">
      <Box bgColor={props.bgColor} boxSizing="border-box" dropShadow="lg" h="100%" rounded="0.9rem" w="100%">
        <Image rounded="0.9rem" src={props.image} />
        <Text
          color={props.letterColor}
          fontSize="4xl"
          fontWeight="extrabold"
          left="10%"
          position="absolute"
          textAlign="center"
          top="10%"
        >
          {props.title}
        </Text>
      </Box>
    </Link>
  </AspectRatio>
);

const HomeRectBoxTwoByOne = props => (
  <AspectRatio border={`2px solid ${mainColor}`} maxW="250px" ratio={2} rounded="1rem" w="50%">
    <Link h="100%" to={props.link} w="100%">
      <Box bgColor={props.bgColor} h="100%" rounded="0.9rem" w="100%">
        <Image rounded="0.9rem" src={props.image} marginLeft={props.ml && props.ml} />
        <Text
          color={props.letterColor}
          fontSize="2xl"
          fontWeight="extrabold"
          left="10%"
          position="absolute"
          textAlign="center"
          top="20%"
        >
          {props.title}
        </Text>
      </Box>
    </Link>
  </AspectRatio>
);

const HomeRectBoxTwoByOneModal = props => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  return (
    <AspectRatio border={`2px solid ${mainColor}`} maxW="250px" ratio={2} rounded="1rem" w="50%">
      <Button h="100%" m={0} onClick={onOpen} p={0} rounded="0.9rem" w="100%">
        <Box bgColor={props.bgColor} h="100%" w="100%">
          <Image rounded="0.9rem" src={props.image} w="100%" />
          <Text
            color={props.letterColor}
            fontSize="2xl"
            fontWeight="extrabold"
            left="10%"
            position="absolute"
            textAlign="center"
            top="20%"
          >
            {props.title}
          </Text>
        </Box>
        {isOpen ? <props.component isOpen={isOpen} onClose={onClose} /> : null}
      </Button>
    </AspectRatio>
  );
};
