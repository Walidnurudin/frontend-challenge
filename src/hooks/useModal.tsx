import { useState } from 'react';

export const useModal = (value: Boolean) => {
    const [isOpen, setIsOpen] = useState<Boolean>(value || false);

    return {
        isOpen,
        openModal: () => setIsOpen(true),
        closeModal: () => setIsOpen(false),
    };
};
