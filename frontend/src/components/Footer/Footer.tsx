import type { ComponentType } from 'react';
import { useLocation } from 'react-router-dom';
import { HomeFooter, ProductFooter } from './FooterContent';
import { FooterBody } from './FooterTemplate';

const footerComponentMap: Record<string, ComponentType> = {
  '/': HomeFooter,
  '/product': ProductFooter,
};

export const Footer = () => {
  const { pathname } = useLocation();
  const FooterContent = footerComponentMap[pathname] || HomeFooter;

  return (
    <FooterBody>
      <FooterContent />
    </FooterBody>
  );
};
