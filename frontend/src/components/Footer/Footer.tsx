import { useLocation } from 'react-router-dom';
import { Home, Product } from './FooterContent';

type FooterProps = {
  footers: {
    [key: string]: React.ComponentType;
  };
};

export const Footer = ({ footers }: FooterProps) => {
  const { pathname } = useLocation();
  const FooterContent = footers[pathname] || null;

  if (!FooterContent) return null;

  return <FooterContent />;
};

Footer.Home = Home;
Footer.Product = Product;
