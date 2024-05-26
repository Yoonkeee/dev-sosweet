import { Button, Flex, HStack, Text, useToast } from '@chakra-ui/react';
import { AlbumListContainer } from '../components/AlbumLIst/Container';
import { ListContainer } from '../components/List';
import {
  getGoogleAccessToken,
  verifyGoogleToken,
  getHeaderTopPosition,
  getPayBeltsRequired,
  getPayTimeRequired,
} from '../api';
import { GoogleLogin, useGoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { googleLoginAtom } from '../store/google';
import { useEffect } from 'react';

export const AlbumList = () => {
  const googleLoginStatus = useRecoilValue(googleLoginAtom);
  const setGoogleLogin = useSetRecoilState(googleLoginAtom);

  useEffect(() => {
    console.log(googleLoginStatus);
  }, [googleLoginStatus.login]);

  useEffect(() => {
    const checkTokenValidity = async () => {
      const isValid = await verifyGoogleToken(googleLoginStatus.token);
      console.log(googleLoginStatus);
      console.log(isValid);
      if (!isValid) {
        setGoogleLogin({ login: false, usermail: '', token: '' });
      }
    };

    if (googleLoginStatus.login) {
      checkTokenValidity();
    }
  }, []);
  return (
    <ListContainer>
      {googleLoginStatus.login ? (
        <>
          <Header />
          <AlbumListContainer />
        </>
      ) : (
        <GoogleLoginImplementation />
      )}
      {/*<Header />*/}
      {/*<AlbumListContainer />*/}
    </ListContainer>
  );
};
// type googleLoginAtomType = { login: boolean, usermail: string }
const GoogleLoginImplementation = () => {
  const setGoogleLogin = useSetRecoilState(googleLoginAtom);

  const googleLogin = useGoogleLogin({
    flow: 'auth-code',
    prompt: 'none',
    response_type: 'token',
    scope:
      'https://www.googleapis.com/auth/photoslibrary.readonly https://www.googleapis.com/auth/photoslibrary.appendonly https://www.googleapis.com/auth/photoslibrary.sharing',
    onSuccess: async codeResponse => {
      console.log(codeResponse);
      const result = await getGoogleAccessToken(codeResponse.code);
      setGoogleLogin({ login: true, usermail: jwtDecode(result.id_token).email, token: result.access_token });
      console.log(result);
      // const tokens = await axios.post('http://localhost:3001/auth/google', {
      //   code: codeResponse.code,
      // });
      //
      // console.log(tokens);
    },
    onError: errorResponse => console.log(errorResponse),
  });

  // const toast = useToast();
  // const onSuccess = credential => {
  //   const result = jwtDecode(credential);
  //   if (result && result.email === 'sosweetmanager@gmail.com') {
  //     setGoogleLogin({ login: true, usermail: result.email });
  //     toast({
  //       position: 'top',
  //       title: '로그인 성공',
  //       status: 'success',
  //       duration: 1000,
  //       isClosable: true,
  //     });
  //   } else {
  //     setGoogleLogin({ login: false, usermail: '' });
  //     toast({
  //       position: 'top',
  //       title: '계정 오류!',
  //       description: '쏘스윗 매니저 계정으로 로그인해주세요.',
  //       status: 'error',
  //       duration: 3000,
  //       isClosable: true,
  //     });
  //   }
  //   console.log(result);
  // };
  // const onError = () => {
  //   setGoogleLogin({ login: false, usermail: '' });
  //   toast({
  //     position: 'top',
  //     title: '로그인 실패',
  //     status: '프로 아빠에게 문의해주세요.(구글 로그인 실패)',
  //     duration: 3000,
  //     isClosable: true,
  //   });
  // };
  return (
    <Flex w={'100%'} justifyContent={'center'} mt={'10vh'} mb={'auto'}>
      <Button onClick={googleLogin}> 구글 로그인 </Button>
      {/*<GoogleLogin*/}
      {/*  useOneTap*/}
      {/*  cancel_on_tap_outside*/}
      {/*  onSuccess={({ credential }) => onSuccess(credential)}*/}
      {/*  onError={onError}*/}
      {/*  ux_mode={''}*/}
      {/*/>*/}
    </Flex>
  );
};

const Header = () => {
  return (
    <HStack
      bgColor="white"
      borderBottom="5px #1a2a52 solid"
      h="7vh"
      justifyContent="space-between"
      position="sticky"
      px="10%"
      top={getHeaderTopPosition()}
      w="100%"
      zIndex={2}
    >
      <Text align={'center'} w="30%" mx="auto" fontSize="xl">
        이름
      </Text>
      <Text align={'center'} w="30%" mx="auto" fontSize="xl">
        앨범
      </Text>
    </HStack>
  );
};
