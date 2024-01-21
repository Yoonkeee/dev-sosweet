import { Button, Link as StyledLink, Flex, HStack, Image, Text, VStack } from '@chakra-ui/react';
import { Link as RouterDomLink, useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import Checkin from '../modals/Checkin';
import { mainColor } from '../api';
import NewDog from '../modals/NewDog';
import AddPay from '../modals/AddPay';
import { setTodayState } from '../store/store';
import LogoImage from '../../public/logo/logo_dog_btn.png';
import AddIcon from '../../public/icons/AddIcon.svg';
import DogIcon from '../../public/icons/DogIcon.svg';
import TimeIcon from '../../public/icons/TimeIcon.svg';
import WonIcon from '../../public/icons/WonIcon.svg';

export const Footer = () => {
  // const location = window.location.pathname;
  // const location = useLocation().pathname;
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState('');
  const setToday = useSetRecoilState(setTodayState);

  const onClose = () => setOpenModal('');
  const onTimetableClick = () => {
    setToday();
    queryClient.refetchQueries({ queryKey: ['timetable'] });
    queryClient.refetchQueries({ queryKey: ['checkoutTimetable'] });
    navigate('/timetable');
  };

  return (
    <Flex
      alignContent="center"
      bgColor="#ffffff"
      borderTop={`3px solid ${mainColor}`}
      bottom={0}
      h="10vh"
      justifyContent="center"
      position="fixed"
      px="auto"
      w="100%"
      zIndex={3}
    >
      <HStack
        alignContent="center"
        alignItems="flex-start"
        bgColor="#ffffff"
        borderTop={`3px solid ${mainColor}`}
        bottom={0}
        display="flex"
        h="10vh"
        justifyContent="space-between"
        maxW="700px"
        paddingTop="0.2vh"
        position="fixed"
        px="min(8vw, 56px)"
        w="100%"
        zIndex={5}
      >
        <FooterButton
          onClick={() => {
            setOpenModal('NewDog');
          }}
          svg={DogIcon}
          text="신규"
        />
        <FooterButton
          onClick={() => {
            setOpenModal('AddPay');
          }}
          svg={WonIcon}
          text="결제"
        />

        <Flex alignContent="flex-start" aspectRatio={1} h="100%" justifyContent="center">
          <StyledLink alignItems="flex-start" as={RouterDomLink} to="/">
            <Image h="90%" src={LogoImage} />
          </StyledLink>
        </Flex>
        <FooterButton onClick={onTimetableClick} svg={TimeIcon} text="시간표" />
        <FooterButton
          onClick={() => {
            setOpenModal('Checkin');
          }}
          svg={AddIcon}
          text="체크인"
        />
        <ModalSwitch onClose={onClose} openModal={openModal} />
      </HStack>
    </Flex>
  );
};

const ModalSwitch = ({ onClose, openModal }) => {
  switch (openModal) {
    case 'NewDog':
      return <NewDog isOpen onClose={onClose} />;
    case 'AddPay':
      return <AddPay isOpen onClose={onClose} />;
    case 'Checkin':
      return <Checkin isOpen onClose={onClose} />;
    default:
      return null;
  }
};

const FooterButton = ({ onClick, svg, text }) => (
  <Button aspectRatio={1} bgColor="transparent" h="100%" onClick={onClick} paddingTop="10px">
    <VStack gap="0.3rem" h="100%" m={0} p={0} w="100%">
      <Image boxSize={8} minInlineSize={8} src={svg} />
      <Text fontSize="sm" marginY={0} p={0}>
        {text}
      </Text>
    </VStack>
  </Button>
);
