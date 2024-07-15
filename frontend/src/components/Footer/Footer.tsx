import type { ComponentType } from 'react';
import { useLocation } from 'react-router-dom';
import { Default as DefaultFooter } from './Default';
import { FooterBody } from './FooterTemplate';
import { Product as ProductFooter } from './Product';

const footerComponentMap: Record<string, ComponentType> = {
  '/': DefaultFooter,
  '/product': ProductFooter,
};

export const Footer = () => {
  const { pathname } = useLocation();
  const FooterContent = footerComponentMap[pathname] || DefaultFooter;

  return (
    <FooterBody>
      <FooterContent />
    </FooterBody>
  );
};
