import { Flex, Image, Link as StyledLink } from '@chakra-ui/react';
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { Link as RouterDomLink, useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { setTodayState } from '../../../store/store';
import { FooterBody, FooterButton, FooterModal } from '../FooterTemplate';

export const Home = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [modalName, setModalName] = useState('');
  const setToday = useSetRecoilState(setTodayState);

  const onClose = () => setModalName('');
  const onTimetableClick = () => {
    setToday(null);
    queryClient.refetchQueries({ queryKey: ['timetable'] });
    queryClient.refetchQueries({ queryKey: ['checkoutTimetable'] });
    navigate('/timetable');
  };

  return (
    <FooterBody>
      <FooterButton
        onClick={() => {
          setModalName('NewDog');
        }}
        svg="/icons/DogIcon.svg"
        text="신규"
      />
      <FooterButton
        onClick={() => {
          setModalName('AddPay');
        }}
        svg="/icons/WonIcon.svg"
        text="결제"
      />
      <Flex alignContent="flex-start" aspectRatio={1} h="100%" justifyContent="center">
        <StyledLink alignItems="flex-start" as={RouterDomLink} to="/">
          <Image h="90%" src="/logo/logo_dog_btn.png" />
        </StyledLink>
      </Flex>
      <FooterButton onClick={onTimetableClick} svg="/icons/TimeIcon.svg" text="시간표" />
      <FooterButton
        onClick={() => {
          setModalName('Checkin');
        }}
        svg="/icons/AddIcon.svg"
        text="체크인"
      />
      <FooterModal name={modalName} onClose={onClose} />
    </FooterBody>
  );
};
