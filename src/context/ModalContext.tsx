import { createContext, useState, useContext, ReactNode } from "react";

type Modal = {
  id: string;
  isOpen: boolean;
  content: ReactNode;
};

type ModalContextType = {
  openModal: (id: string, content: ReactNode) => void;
  closeModal: (id: string) => void;
  isModalOpen: (id: string) => boolean;
  getModalContent: (id: string) => ReactNode | null;
};

const ModalContext = createContext<ModalContextType | null>(null);

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) throw new Error("useModal must be used within a ModalProvider");
  return context;
};

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [modals, setModals] = useState<Modal[]>([]);

  const openModal = (id: string, content: ReactNode) => {
    setModals(prev => {
      // If modal with this ID already exists, update its content and set to open
      const exists = prev.findIndex(modal => modal.id === id);
      if (exists !== -1) {
        const updated = [...prev];
        updated[exists] = { id, isOpen: true, content };
        return updated;
      }
      
      // Otherwise add a new modal
      return [...prev, { id, isOpen: true, content }];
    });
  };

  const closeModal = (id: string) => {
    setModals(prev => prev.map(modal => 
      modal.id === id ? { ...modal, isOpen: false } : modal
    ));
    
    // Clean up closed modals after animation finishes
    setTimeout(() => {
      setModals(prev => prev.filter(modal => modal.id === id ? modal.isOpen : true));
    }, 500);
  };

  const isModalOpen = (id: string) => {
    return modals.some(modal => modal.id === id && modal.isOpen);
  };

  const getModalContent = (id: string) => {
    const modal = modals.find(modal => modal.id === id);
    return modal ? modal.content : null;
  };

  return (
    <ModalContext.Provider value={{ openModal, closeModal, isModalOpen, getModalContent }}>
      {children}
      
      {/* Render all active modals */}
      {modals.map(modal => (
        modal.isOpen && (
          <div
            key={modal.id}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
            onClick={() => closeModal(modal.id)}
          >
            <div 
              className="glass-modal max-w-lg w-full max-h-[90vh] overflow-y-auto animate-scale-in"
              onClick={(e) => e.stopPropagation()}
            >
              {modal.content}
            </div>
          </div>
        )
      ))}
    </ModalContext.Provider>
  );
};
