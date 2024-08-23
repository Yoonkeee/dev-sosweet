import type { MutableRefObject } from 'react';

export type PopoverProps = {
  name: string;
  modalRef: MutableRefObject<HTMLElement | null>;
  onDelete: VoidFunction;
  bgColor?: string;
  fontColor?: string;
};
