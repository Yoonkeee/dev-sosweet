import {
  Button,
  Flex,
  Heading,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
  Portal,
  Text,
  useToast,
} from '@chakra-ui/react';
import { useRef } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import CopyToClipboard from 'react-copy-to-clipboard';
import { checkUsedDate } from '../api';
import { ProfileImage } from '../components/NameWithProfileImage';

const MakeMessage = ({ checked, isOpen, name, onClose, text }) => {
  const queryClient = useQueryClient();
  const toast = useToast();

  const sendButton = () => {
    onClose();
    checkUsedDate(checked).then(res => {
      if (res) {
        toast({
          title: '전송 완료 처리했어요~~',
          status: 'success',
          position: 'top',
          duration: 1500,
          isClosable: true,
        });
        queryClient.refetchQueries({ queryKey: ['history'] });
      } else {
        toast({
          title: '에러가 났어요... 죄송해요ㅜㅜ',
          status: 'error',
          position: 'top',
          duration: 2000,
          isClosable: true,
        });
      }
    });
    queryClient.refetchQueries({ queryKey: ['history', '', 'getMessage'] });
    queryClient.refetchQueries({ queryKey: ['unchecked-dogs-list'] });
    queryClient.refetchQueries({ queryKey: ['getAllUnchecked'] });
  };
  const ref = useRef(null);

  return (
    <Modal isCentered isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent ref={ref}>
        <ModalHeader>
          <HStack>
            <ProfileImage name={name} />
            <Text>{name} 시간 계산하기~</Text>
          </HStack>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody as="form">
          <Text fontSize="0.85rem" fontWeight={400} whiteSpace="pre-line">
            {text}
          </Text>
          <ModalFooter>
            <CopyToClipboard
              onCopy={() => {
                toast({
                  title: '복사되었습니다!',
                  description: '카톡으로 보내세용~~',
                  position: 'top',
                  status: 'success',
                  duration: 1000,
                  isClosable: true,
                });
              }}
              options={{ format: 'text/plain' }}
              text={text}
            >
              <Button
                _hover={{
                  textDecoration: 'none',
                  color: 'white',
                  rounded: 'xl',
                  transform: 'scale(1.2)',
                }}
                colorScheme="green"
                mr={3}
                rounded="xl"
              >
                복사!
              </Button>
            </CopyToClipboard>
            <Button
              _hover={{
                textDecoration: 'none',
                color: 'white',
                rounded: 'xl',
                transform: 'scale(1.2)',
              }}
              colorScheme="red"
              mr={3}
              onClick={onClose}
              rounded="xl"
            >
              취소
            </Button>
            <Popover placement="top-start">
              <PopoverTrigger>
                <Button
                  _hover={{
                    textDecoration: 'none',
                    color: 'white',
                    bg: '#526491',
                    rounded: 'xl',
                    transform: 'scale(1.2)',
                  }}
                  bg="#1a2a52"
                  color="white"
                  rounded="xl"
                >
                  전송 완료~
                </Button>
              </PopoverTrigger>
              <Portal containerRef={ref}>
                <PopoverContent bg="gray.200" w="100%">
                  <PopoverArrow />
                  <PopoverCloseButton />
                  <PopoverBody>
                    <Heading fontSize="2xl" my="3vh">
                      카톡 전송 완료 처리할까요?
                    </Heading>
                    <Button colorScheme="yellow" onClick={sendButton}>
                      네!
                    </Button>
                  </PopoverBody>
                </PopoverContent>
              </Portal>
            </Popover>
          </ModalFooter>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default MakeMessage;
