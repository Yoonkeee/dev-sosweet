import { Button, Flex, HStack, Image, Link as StyledLink, Text, VStack } from '@chakra-ui/react';
import { Link, Link as RouterDomLink } from 'react-router-dom';
import AddIcon from '../../../public/icons/AddIcon.svg';
import SaleIcon from '../../../public/icons/Sale.svg';
import LogoImage from '../../../public/logo/logo_dog_btn.png';
import { mainColor } from '../../api';

export const ProductFooter = () => (
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
      <Flex alignContent="flex-start" aspectRatio={1} h="100%" justifyContent="center">
        <Link to="/sales">
          <FooterButton src={SaleIcon} text="판매" />
        </Link>
      </Flex>
      <Flex alignContent="flex-start" aspectRatio={1} h="100%" justifyContent="center">
        <StyledLink alignItems="flex-start" as={RouterDomLink} to="/">
          <Image h="90%" src={LogoImage} />
        </StyledLink>
      </Flex>
      <FooterButton
        onClick={() => {
          console.log('상품추가');
        }}
        src={AddIcon}
        text="상품추가"
      />
    </HStack>
  </Flex>
);

const FooterButton = ({ onClick, src, text }: { onClick?: VoidFunction; src: string; text: string }) => (
  <Button aspectRatio={1} bgColor="transparent" h="100%" onClick={onClick} paddingTop="10px">
    <VStack gap="0.3rem" h="100%" m={0} p={0} w="100%">
      <Image boxSize={8} minInlineSize={8} src={src} />
      <Text fontSize="sm" marginY={0} p={0}>
        {text}
      </Text>
    </VStack>
  </Button>
);
