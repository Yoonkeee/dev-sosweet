import { Button, Flex, HStack, Image, Text, VStack } from '@chakra-ui/react';
import type { ComponentType, PropsWithChildren } from 'react';
import { mainColor } from '../../api';
import AddPay from '../../modals/AddPay';
import Checkin from '../../modals/Checkin';
import NewDog from '../../modals/NewDog';

export const FooterBody = ({ children }: PropsWithChildren) => (
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
      {children}
    </HStack>
  </Flex>
);

type FooterButtonProps = {
  onClick: VoidFunction;
  svg: string;
  text: string;
};

export const FooterButton = ({ onClick, svg, text }: FooterButtonProps) => (
  <Button aspectRatio={1} bgColor="transparent" h="100%" onClick={onClick} paddingTop="10px">
    <VStack gap="0.3rem" h="100%" m={0} p={0} w="100%">
      <Image boxSize={8} minInlineSize={8} src={svg} />
      <Text fontSize="sm" marginY={0} p={0}>
        {text}
      </Text>
    </VStack>
  </Button>
);

type FooterModalProps = {
  isOpen: boolean;
  onClose: VoidFunction;
};

const modal: Record<string, ComponentType<FooterModalProps>> = {
  AddPay,
  Checkin,
  NewDog,
};

export const FooterModal = ({ name, onClose }: { name: string; onClose: VoidFunction }) => {
  const ModalComponent = modal[name] ?? null;

  if (!ModalComponent) return null;

  return <ModalComponent isOpen onClose={onClose} />;
};
