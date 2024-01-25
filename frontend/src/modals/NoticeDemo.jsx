import {
  Button,
  Checkbox,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
} from '@chakra-ui/react';
import { isEqualOrBefore, kstFormat } from '@toss/date';
import { useRecoilState } from 'recoil';
import { useEffect, useState } from 'react';
import { demoPopupAtom } from '../store/authentication';

export const NoticeDemo = () => {
  const [demoPopup, setDemoPopup] = useRecoilState(demoPopupAtom);
  const [isOpen, setIsOpen] = useState(false);

  const currentFormattedTime = () => kstFormat(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSSXXX");

  const isTimeRemaining = () =>
    demoPopup.reOpenOn
      ? isEqualOrBefore(new Date(currentFormattedTime()), new Date(demoPopup.reOpenOn))
      : false;

  const setOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

  const closeForOneHour = () => {
    const reOpenTime = kstFormat(new Date(Date.now() + 1000 * 60 * 60), "yyyy-MM-dd'T'HH:mm:ss.SSSXXX");
    setDemoPopup({ status: false, reOpenOn: reOpenTime });
    setIsOpen(false);
  };

  useEffect(() => {
    if (!isTimeRemaining()) {
      setDemoPopup({ status: true, reOpenOn: null });
      setOpen();
    }
  }, []);

  return (
    <Modal isCentered isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>데모 안내</ModalHeader>
        <ModalCloseButton />
        <ModalBody my={4}>
          <VStack alignItems="flex-start" fontFamily="Pretendard" textAlign="left" w="100%">
            <p>- 로그인 비밀번호는 0000 입니다.</p>
            <p>- 본 페이지는 서비스중인 쏘스윗 매니저 앱의 데모입니다.</p>
            <p>- 기능들을 편하게 체험해보셔도 좋습니다.</p>
            <p>
              - 이 곳에서 실행되는 결과는 Live 서비스 데이터에 영향을 주지 않으며, 일정 시간마다 Live 서비스의
              데이터를 복제하여 덮어쓰도록 설정되어 있습니다.
            </p>
          </VStack>
        </ModalBody>
        <ModalFooter justifyContent="flex-end">
          <Checkbox mr="10%" onChange={closeForOneHour} size="lg">
            <Text onClick={closeForOneHour}>1시간동안 보지 않기</Text>
          </Checkbox>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            확인
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
