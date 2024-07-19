import { Flex, Image, Link as StyledLink, useDisclosure } from '@chakra-ui/react';
import { Link as RouterDomLink, useNavigate } from 'react-router-dom';
import { FooterBody, FooterButton, FooterModal } from '../FooterTemplate';

export const Product = () => {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <FooterBody>
      <FooterButton onClick={() => navigate('/sales')} svg="/icons/Sale.svg" text="판매" />
      <Flex alignContent="flex-start" aspectRatio={1} h="100%" justifyContent="center">
        <StyledLink alignItems="flex-start" as={RouterDomLink} to="/">
          <Image h="90%" src="/logo/logo_dog_btn.png" />
        </StyledLink>
      </Flex>
      <FooterButton onClick={() => onOpen()} svg="/icons/AddIcon.svg" text="상품추가" />
      {isOpen && <FooterModal name="NewProduct" onClose={onClose} />}
    </FooterBody>
  );
};
