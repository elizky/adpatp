'use client';
import { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from 'react';
import { Match } from '@/types/types'; // Asegúrate de importar el tipo Match.

interface ModalContextType {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  openModal: () => void;
  closeModal: () => void;
  matchData: Match | null; // Datos del partido a editar (o null si es creación).
  setMatchData: Dispatch<SetStateAction<Match | null>>;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [matchData, setMatchData] = useState<Match | null>(null);

  const openModal = () => setIsOpen(true);
  const closeModal = () => {
    setIsOpen(false);
    setMatchData(null); // Limpia los datos cuando se cierra el modal.
  };

  return (
    <ModalContext.Provider
      value={{ isOpen, openModal, closeModal, setIsOpen, matchData, setMatchData }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};
