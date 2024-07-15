import { Flex, Image, Link as StyledLink } from '@chakra-ui/react';
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { Link as RouterDomLink, useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import AddIcon from '../../../public/icons/AddIcon.svg';
import DogIcon from '../../../public/icons/DogIcon.svg';
import TimeIcon from '../../../public/icons/TimeIcon.svg';
import WonIcon from '../../../public/icons/WonIcon.svg';
import LogoImage from '../../../public/logo/logo_dog_btn.png';
import { setTodayState } from '../../store/store';
import { FooterButton, FooterModal } from './FooterTemplate';

export const Default = () => {
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
    <>
      <FooterButton
        onClick={() => {
          setModalName('NewDog');
        }}
        svg={DogIcon}
        text="신규"
      />
      <FooterButton
        onClick={() => {
          setModalName('AddPay');
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
          setModalName('Checkin');
        }}
        svg={AddIcon}
        text="체크인"
      />
      <FooterModal name={modalName} onClose={onClose} />
    </>
  );
};
