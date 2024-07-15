import { Flex, Image, Link as StyledLink } from '@chakra-ui/react';
import { Link as RouterDomLink, useNavigate } from 'react-router-dom';
import AddIcon from '../../../public/icons/AddIcon.svg';
import SaleIcon from '../../../public/icons/Sale.svg';
import LogoImage from '../../../public/logo/logo_dog_btn.png';
import { FooterButton } from './FooterTemplate';

export const Product = () => {
  const navigate = useNavigate();
  return (
    <>
      <FooterButton onClick={() => navigate('/sales')} svg={SaleIcon} text="판매" />
      <Flex alignContent="flex-start" aspectRatio={1} h="100%" justifyContent="center">
        <StyledLink alignItems="flex-start" as={RouterDomLink} to="/">
          <Image h="90%" src={LogoImage} />
        </StyledLink>
      </Flex>
      <FooterButton
        onClick={() => {
          // TODO: Issue #10 에서 상품 추가 모달 열기 로직 연결
        }}
        svg={AddIcon}
        text="상품추가"
      />
    </>
  );
};
