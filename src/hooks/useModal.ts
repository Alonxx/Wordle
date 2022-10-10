import { useState } from "react";

export const useModal = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const toggleModal = () => setIsModalOpen(!isModalOpen);
  return {
    toggleModal,
    isModalOpen,
  };
};
