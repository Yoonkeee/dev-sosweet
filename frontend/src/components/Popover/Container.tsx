import {
  Button,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
  Portal,
} from '@chakra-ui/react';
import type { MutableRefObject, PropsWithChildren } from 'react';

type TriggerProps = {
  name: string;
  bgColor?: string;
  fontColor?: string;
} & PropsWithChildren;

type ContentProps = {
  modalRef: MutableRefObject<HTMLElement | null>;
} & PropsWithChildren;

export const PopoverContainer = ({
  name,
  bgColor = 'yellow',
  fontColor = '#f8f8f8',
  children,
}: TriggerProps) => {
  return (
    <Popover placement="top-start">
      <PopoverTrigger>
        <Button
          _hover={{
            textDecoration: 'none',
            rounded: 'xl',
            transform: 'scale(1.2)',
          }}
          color={fontColor}
          colorScheme={bgColor}
          rounded="xl"
        >
          {name}
        </Button>
      </PopoverTrigger>
      {children}
    </Popover>
  );
};

export const Content = ({ modalRef, children }: ContentProps) => {
  return (
    <Portal containerRef={modalRef}>
      <PopoverContent bg="gray.200" w="100%">
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverBody>{children}</PopoverBody>
      </PopoverContent>
    </Portal>
  );
};

PopoverContainer.Content = Content;
