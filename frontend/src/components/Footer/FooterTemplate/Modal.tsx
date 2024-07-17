import type { ComponentType } from 'react';
import AddPay from '../../../modals/AddPay';
import Checkin from '../../../modals/Checkin';
import NewDog from '../../../modals/NewDog';

type FooterModalProps = {
  isOpen: boolean;
  onClose: VoidFunction;
};

const modal: { [key: string]: ComponentType<FooterModalProps> } = {
  AddPay,
  Checkin,
  NewDog,
};

export const FooterModal = ({ name, onClose }: { name: string; onClose: VoidFunction }) => {
  const ModalComponent = modal[name] ?? null;

  if (!ModalComponent) return null;

  return <ModalComponent isOpen onClose={onClose} />;
};
