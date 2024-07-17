import { Flex, Image, Link as StyledLink } from '@chakra-ui/react';
import { Link as RouterDomLink, useNavigate } from 'react-router-dom';
import { FooterBody, FooterButton } from '../FooterTemplate';

export const Product = () => {
  const navigate = useNavigate();
  return (
    <FooterBody>
      <FooterButton onClick={() => navigate('/sales')} svg="/icons/Sale.svg" text="판매" />
      <Flex alignContent="flex-start" aspectRatio={1} h="100%" justifyContent="center">
        <StyledLink alignItems="flex-start" as={RouterDomLink} to="/">
          <Image h="90%" src="/logo/logo_dog_btn.png" />
        </StyledLink>
      </Flex>
      <FooterButton
        onClick={() => {
          // TODO: Issue #10 에서 상품 추가 모달 열기 로직 연결
        }}
        svg="/icons/AddIcon.svg"
        text="상품추가"
      />
    </FooterBody>
  );
};
