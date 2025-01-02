'use client';
import { Player } from '@/types/types';
import { Button } from '../ui/button';
import MatchForm from './MatchForm';
import { useModal } from '@/lib/ModalContext';

const MatchFormButton = ({ players }: { players: Player[] }) => {
  const { isOpen, openModal, closeModal } = useModal();

  return (
    <>
      <Button className='w-full mb-6' onClick={openModal}>
        + Add Tennis Match Result
      </Button>
      <MatchForm players={players} isOpen={isOpen} setIsOpen={closeModal} />
    </>
  );
};

export default MatchFormButton;
