import {
  Badge,
  Button,
  Flex,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useEffect, useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';
import {
  addProfile,
  formatMinuteToTime,
  getDogInfo,
  getProfile,
  getUploadUrl,
  modDog,
  uploadImage,
} from '../api';
import { currentDateState } from '../store/store';
import { ProfileImage } from '../components/NameWithProfileImage';

const DogInfo = ({ isOpen, name, onClose }) => {
  const [remainingTime, setRemainingTime] = useState('');
  const [usedBelts, setUsedBelts] = useState('');
  const [beltColor, setBeltColor] = useState('green');
  const [lastVisited, setLastVisited] = useState('');
  const [visitColor, setVisitColor] = useState('telegram');
  const [isFileUploaded, setIsFileUploaded] = useState(false);
  const [uploadURL, setuploadURL] = useState('');
  const [isUploaded, setIsUploaded] = useState(true);
  const [profileUrl, setProfileUrl] = useState('');
  const [timeColor, setTimeColor] = useState('green');
  const [file, setFile] = useState(null);
  const imageRef = useRef(null);
  const date = useRecoilValue(currentDateState);

  const { handleSubmit, register, reset } = useForm();

  const toast = useToast();
  const queryClient = useQueryClient();

  const onReset = () => {
    reset({
      officialName: '',
      allergy: '',
      dogInfo: '',
      dogBreed: '',
      dogGender: '',
      phone: '',
      dogWeight: '',
    });
    setFile(null);
    setProfileUrl('');
    setIsFileUploaded(false);
  };

  const onCloseFn = () => {
    onClose();
    onReset();
  };

  const mutation = useMutation({
    mutationFn: modDog,
    onSuccess: () => {
      toast({
        title: `${name} 수정에 성공했어요~~`,
        status: 'success',
        position: 'top',
        duration: 1000,
        isClosable: true,
      });
      queryClient.refetchQueries({ queryKey: ['dogs-list'] });
      queryClient.refetchQueries({ queryKey: ['dog_info', name] });
      queryClient.refetchQueries({ queryKey: ['allergy', name] });
      onCloseFn();
    },
  });

  const onSubmit = res => {
    res = { ...res, name };
    mutation.mutate(res);
  };

  const { data, isLoading } = useQuery({ queryKey: ['dog_info', name], queryFn: getDogInfo });

  const setDataOnModal = () => {
    reset({
      officialName: data.official_name,
      allergy: data.allergy,
      dogInfo: data.note,
      dogBreed: data.breed,
      dogGender: data.gender,
      phone: data.phone,
      dogWeight: data.weight,
    });
  };

  useEffect(() => {
    if (data && !isLoading) {
      setRemainingTime(formatMinuteToTime(data.remaining_minutes));
      setUsedBelts(`${data.used_belts}개`);
      if (data.used_belts > 0) {
        setBeltColor('orange');
      }
      if (data.last_visited) {
        setVisitColor('telegram');
        setLastVisited(data.last_visited);
      } else {
        setVisitColor('pink');
        setLastVisited('기록에 없어요ㅜ');
      }
      setDataOnModal();
    }
  }, [data]);

  useEffect(() => {
    if (data && data.remaining_minutes < 0) {
      setTimeColor('red');
    }
  }, [remainingTime]);

  const onUploadImageButtonClick = () => {
    if (!imageRef.current) {
      return;
    }
    imageRef.current.click();
  };

  useEffect(() => {
    if (file) setIsFileUploaded(true);
    else setIsFileUploaded(false);
  }, [file]);

  const onFileChange = e => {
    const {
      target: { files },
    } = e;
    const theFile = files[0];
    setFile(theFile);
  };

  const { data: profileData } = useQuery({
    queryKey: ['profile', name],
    queryFn: getProfile,
  });

  useEffect(() => {
    if (profileData) {
      setProfileUrl(profileData);
    } else {
      setProfileUrl('');
    }
  }, [profileData]);

  const onUploadServerButtonClick = () => {
    if (file == null) return;
    setIsUploaded(false);
    getUploadUrl().then(res => {
      setuploadURL(res.uploadURL);
    });
  };

  const [fileId, setFileId] = useState('');

  useEffect(() => {
    if (uploadURL === '') return;
    uploadImage(file, uploadURL).then(res => {
      setFileId(res.result.id);
    });
  }, [uploadURL]);

  useEffect(() => {
    if (fileId) {
      addProfile(name, fileId).then(res => {
        queryClient.refetchQueries({ queryKey: ['dog_info', name] });
        queryClient.refetchQueries({ queryKey: ['profile', name] });
        if (res) {
          toast({
            title: `${name} 사진 업로드에 성공했어요~~`,
            status: 'success',
            position: 'top',
            duration: 1000,
            isClosable: true,
          });
        } else {
          toast({
            title: `${name} 사진 업로드에 실패했어요ㅜㅜ`,
            status: 'error',
            position: 'top',
            duration: 1000,
            isClosable: true,
          });
        }
        setIsUploaded(true);
        onCloseFn();
      });
    }
  }, [fileId]);

  useEffect(() => {
    if (isOpen) queryClient.refetchQueries({ queryKey: ['dog_info', name] }).then(() => setDataOnModal());
  }, [isOpen]);

  return (
    <Modal isCentered isOpen={isOpen} onClose={onCloseFn}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader pl="10px">
          <HStack>
            <ProfileImage name={name} />
            <Text>{name}🥰 정보</Text>
          </HStack>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody as="form" onSubmit={handleSubmit(onSubmit)}>
          <VStack w="100%">
            <HStack w="100%">
              <Text w="25%">공식 이름</Text>
              <Input
                placeholder="공식 이름 미입력시 이름과 동일(선택)"
                variant="filled"
                w="75%"
                {...register('officialName')}
              />
            </HStack>
            <HStack w="100%">
              <Text w="25%">알러지</Text>
              <Input placeholder="알러지(선택)" variant="filled" w="75%" {...register('allergy')} />
            </HStack>
            <HStack w="100%">
              <Text w="25%">특이사항</Text>
              <Input placeholder="특이사항(선택)" variant="filled" w="75%" {...register('dogInfo')} />
            </HStack>
            <HStack w="100%">
              <Text w="25%">견종&성별</Text>
              <HStack w="75%">
                <Input placeholder="견종(선택)" variant="filled" w="75%" {...register('dogBreed')} />
                <Input placeholder="성별(선택)" variant="filled" w="25%" {...register('dogGender')} />
              </HStack>
            </HStack>
            <HStack w="100%">
              <Text w="25%">
                전화번호&
                <br />
                벨트 사용량
              </Text>
              <HStack w="75%">
                <Input placeholder="견주 전화번호(선택)" variant="filled" w="75%" {...register('phone')} />
                <Badge colorScheme={beltColor} display="flex" fontSize="xl" justifyContent="center" w="25%">
                  {usedBelts}
                </Badge>
              </HStack>
            </HStack>
            <HStack w="100%">
              <Text w="25%">
                몸무게&
                <br />
                잔여시간
              </Text>
              <HStack w="75%">
                <Input
                  placeholder="몸무게(선택)"
                  variant="filled"
                  // value={dogWeight}
                  w="75%"
                  {...register('dogWeight')}
                />
                <Badge colorScheme={timeColor} display="flex" fontSize="xl" justifyContent="center" w="25%">
                  {remainingTime}
                </Badge>
              </HStack>
            </HStack>
            <HStack w="100%">
              <Text w="25%">최근방문</Text>
              <Badge colorScheme={visitColor} display="flex" fontSize="xl" justifyContent="center" w="50%">
                {lastVisited}
              </Badge>
            </HStack>
          </VStack>
          <ModalFooter mx={0} px={0}>
            <Flex
              css={{ WebkitMarginStart: 0 }}
              justifyContent="flex-end"
              m={0}
              marginInlineStart={0}
              p={0}
              w="100%"
            >
              {name ? (
                <>
                  <Input
                    ref={imageRef}
                    accept={'image/*'}
                    display="none"
                    onChange={onFileChange}
                    type="file"
                  />
                  {isFileUploaded ? (
                    <Button
                      _hover={{
                        textDecoration: 'none',
                        color: 'white',
                        rounded: 'xl',
                        transform: 'scale(1.2)',
                      }}
                      colorScheme="green"
                      isLoading={!isUploaded}
                      onClick={onUploadServerButtonClick}
                      rounded="xl"
                    >
                      업로드!
                    </Button>
                  ) : (
                    <Button
                      _hover={{
                        textDecoration: 'none',
                        color: 'white',
                        rounded: 'xl',
                        transform: 'scale(1.2)',
                      }}
                      colorScheme="twitter"
                      onClick={onUploadImageButtonClick}
                      rounded="xl"
                    >
                      사진등록
                    </Button>
                  )}
                </>
              ) : null}
              <Button
                _hover={{
                  textDecoration: 'none',
                  color: 'white',
                  rounded: 'xl',
                  transform: 'scale(1.2)',
                }}
                colorScheme="red"
                mx={3}
                onClick={onCloseFn}
                rounded="xl"
              >
                취소
              </Button>
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
                type="submit"
              >
                수정~
              </Button>
            </Flex>
          </ModalFooter>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default DogInfo;
