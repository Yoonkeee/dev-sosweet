import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Box, useToast, VStack } from '@chakra-ui/react';
import { Suspense, useEffect, useRef } from 'react';
import { useRecoilValue } from 'recoil';
import { ErrorBoundary } from '@toss/error-boundary';
import { convertNewlineToJSX } from '@toss/react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { getHeaderTopPosition, restartDBConnection } from './api';
import { authenticationAtom } from './store/authentication';
import { Authentication } from './routes';
import { SkeletonContainer } from './components/Skeleton';
import { NoticeDemo } from './modals/NoticeDemo';

export const Root = () => {
  const { pathname } = useLocation();
  const div = useRef(null);
  const isAuthorized = useRecoilValue(authenticationAtom);
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <ErrorBoundary
      renderFallback={() => {
        restartDBConnection();
        toast({
          title: convertNewlineToJSX('에러가 발생해서 서버를 재시작할게요.\n다시 시도해주세요.'),
          status: 'error',
          position: 'top',
          duration: 3000,
          isClosable: true,
        });
        navigate('/on-error');
      }}
    >
      <VStack
        ref={div}
        bgColor="#E2E8F0"
        gap={0}
        m="0"
        maxW="700px"
        minH="100vh"
        mx="auto"
        position="relative"
        style={{
          fontFamily:
            'GmarketSans, Pretendard, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol',
        }}
      >
        <NoticeDemo />
        {isAuthorized ? (
          <>
            <Header />
            <VStack
              bgColor="#E2E8F0"
              gap={0}
              minH="80vh"
              position="relative"
              top={getHeaderTopPosition()}
              w="100%"
            >
              <Suspense fallback={<SkeletonContainer />}>
                <Outlet />
                <Box h="10vh" w="100%" />
              </Suspense>
            </VStack>
            <Footer />
          </>
        ) : (
          <Authentication />
        )}
      </VStack>
    </ErrorBoundary>
  );
};

// const loading = useRef(null);
// const touchStartY = useRef(0);
// const loadingHeight = useRef(0);
// const handleRefresh = useRef(() => {
//   window.location.reload();
// });

// const getMobileSafeAreaMargin = () => {
//   try {
//     if (isMobile()) {
//       const gap = window.outerHeight - window.innerHeight;
//       const statusBarHeight = `${gap}px`;
//       const unitVh = window.innerHeight / 100;
//       const height = window.innerHeight - gap;
//       const paddingVh = 1.36;
//       const result = (paddingVh * unitVh * 100) / height; // 59px in iPhone 14 Pro Max
//       // console.log(window.outerHeight);
//       // console.log(window.innerHeight);
//       // console.log(window.outerHeight - window.innerHeight);
//       // console.log(result);
//       // console.log(unitVh);
//       // console.log(result * unitVh);
//       return `${result}vh`;
//     }
//     return '0px';
//   } catch {
//     return '0px';
//   }
// };

// const pxForVh = window.innerHeight / 100;
// const MAX_HEIGHT = pxForVh * 17;
//
// // const loadingBox = () => <Box h={'10vh'} bgColor={'red'}/>
// function handleTouchStart(e) {
//   if (!div.current || div.current.scrollTop !== 0) return;
//   touchStartY.current = e.changedTouches[0].screenY;
//   const el = document.createElement('div');
//   // el.style.cssText = 'background-color: "red"; transition: height 0s';
//   el.style.cssText = 'background-color: #1a2a52; transition: height 0s';
//   // el.style.cssText = '';
//   // el.style.cssText = 'background-color: red; transition: height 0.3s ease-in-out;';
//   // el.style.backgroundColor = 'red';
//   // el.style.backgroundColor = 'transition: height 0.3s ease-in-out';
//   // el.classList.add('loadingBox'); // 스타일을 지정해주자.
//   div.current.prepend(el); // 스크롤되는 요소의 최상단에 추가해준다.
//   loading.current = el;
// }
//
// function handleTouchMove(e) {
//   // 만약 로딩 요소가 생성되었다면
//   if (loading.current) {
//     const { screenY } = e.changedTouches[0];
//     const height = Math.floor(screenY - touchStartY.current);
//     // const height = Math.floor((screenY - touchStartY.current) * 0.3);
//     // height 가 0 보다 크다면
//     if (height >= 0) {
//       loading.current.style.height = `${height}px`;
//       loadingHeight.current = height;
//     }
//     loading.current.style.cssText = 'background-color: #1a2a52; transition: height 0.3s; height: 0px';
//   }
// }
//
// function handleTouchEnd() {
//   // 로딩 요소의 높이가 MAX_HEIGHT 보다 크다면
//   if (loading.current && loadingHeight.current >= MAX_HEIGHT) {
//     document.documentElement.style.backgroundColor = mainColor;
//     // console.log(loadingHeight.current);
//     // 새로고침 함수를 실행한다.
//     handleRefresh.current();
//     // div.current.removeChild(loading.current); // 로딩 요소를 제거
//     loading.current = null;
//     loadingHeight.current = 0;
//     touchStartY.current = 0;
//   } else {
//     // loading.current.style.cssText = 'transition: height 0.3s; height: 0px';
//     // loading.current.style.height = `0px`;
//     // console.log(loadingHeight.current)
//     touchStartY.current = 0;
//   }
// }

// document.addEventListener('touchstart', handleTouchStart, { passive: true });
// document.addEventListener('touchmove', handleTouchMove, { passive: true });
// document.addEventListener('touchend', handleTouchEnd, { passive: true });

// useEffect(() => {
//   if (window.navigator.standalone && window.innerHeight !== window.outerHeight) {
//     // running as a standalone PWA on iOS and the viewport height doesn't match the device height
//     const height = window.outerHeight - window.innerHeight;
//     dispatch(setStatusBarHeight(height));
//   }
// }, []);
// if (window.innerWidth < 500) {
//   dispatch(setStatusBarHeight('env(safe-area-inset-top)'));
// } else {
//   dispatch(setStatusBarHeight('0px'));
// }
// const statusBarHeight = useSelector(state => state.statusBarHeight);
// const location = window.location.pathname;
// const location = useLocation().pathname;

// {/* <Flex bgColor="red" h="10vh" position="sticky" top={0} w="100%" zIndex={55} /> */}
// {/* <Helmet /> */}
// {/* <Box bgColor={mainColor} m={'0'} overflow={'hidden'} ref={div} style={{ fontFamily: 'GmarketSans' }}> */}
// {/* <Box bgColor={mainColor} h={'10vh'} position="fixed" top={0} w={'100%'} zIndex={1}> */}
// {/* <Box */}
// {/*  bgColor={mainColor} */}
// {/*  h={statusBarHeight} */}
// {/*  justifyContent={'center'} */}
// {/*  textAlign={'center'} */}
// {/*  zIndex={55} */}
// {/* /> */}
// {/* </Box> */}
// {/* <Box bgColor="white" overflowX="hidden" zIndex={54}> */}
// {/* <Box */}
// {/*  alignItems={'flex-end'} */}
// {/*  bgColor={mainColor} */}
// {/*  display={'flex'} */}
// {/*  h={`calc(10vh + ${statusBarHeight})`} */}
// {/*  justifyContent={'center'} */}
// {/*  zIndex={55} */}
// {/* > */}
// {/*  <HStack alignItems={'flex-end'}> */}
// {/*    <Text */}
// {/*      color={'white'} */}
// {/*      fontFamily={'SingleDay'} */}
// {/*      fontSize={'small'} */}
// {/*      fontWeight={'extrabold'} */}
// {/*      lineHeight={'1.1em'} */}
// {/*      mb={'0.2em'} */}
// {/*    > */}
// {/*      새<br />로<br />고<br />침 */}
// {/*    </Text> */}
// {/*    <Img src={'./logo/refresh_icon.png'} w={'50vw'} /> */}
// {/*  </HStack> */}
// {/*  /!*window.location.reload()*!/ */}
// {/*  /!*<Text color={'white'}>*!/ */}
// {/*  /!*    새로고침*!/ */}
// {/*  /!*</Text>*!/ */}
// {/* </Box> */}
