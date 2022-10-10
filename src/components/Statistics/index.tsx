import React from "react";
import { useModal, useCalculateTimeLeft } from "src/hooks";
import { useUserDataStore, useWordsStore } from "src/stores";
import { Modal } from "../Modal";

export const Statistics: React.FC = () => {
  const { isModalOpen, toggleModal } = useModal();
  const { isCurrentWordPlayed, themeMode } = useUserDataStore();

  React.useEffect(() => {
    if (isCurrentWordPlayed) {
      toggleModal();
    }
  }, [isCurrentWordPlayed]);

  return (
    <>
      <Modal
        isModalOpen={isModalOpen}
        children={<ModalContent toggleModal={toggleModal} />}
      />
      <button onClick={() => toggleModal()} className="h-full">
        <div className="dark:w-[40px] dark:h-[36px] ">
          <img
            className="dark:mt-[10px] dark:ml-[5px]"
            src={
              themeMode === "light"
                ? "images/icons/statistics_icon.svg"
                : "images/icons/statistics_icon_dark.svg"
            }
            alt="statistics_icon"
          />
        </div>
      </button>
    </>
  );
};

const ModalContent: React.FC<{ toggleModal: () => void }> = ({
  toggleModal,
}) => {
  const { plays, wins, isCurrentWinner, timeStamp } = useUserDataStore();
  const { currentWord } = useWordsStore();
  const timeLeft = useCalculateTimeLeft(timeStamp);

  return (
    <div className="w-[546px] border border-black border-solid rounded-[15px] bg-gray-smoke-transparent text-center dark:bg-blue-dark dark:border-gray-border dark:text-white">
      <div className="w-[192px] h-[41px] m-[59px_172px_44px_182px]">
        <span className="font-extrabold text-[35px] leading-[41px]">
          Estadísticas
        </span>
      </div>
      <div className="flex flex-row m-[0px_117px_43px_78px] gap-[211px] w-[full] ">
        <div className="flex flex-col gap-[16px]">
          <span className="font-extrabold text-[35px] leading-[41px]">
            {plays}
          </span>
          <span className="font-normal text-[21px] leading-[25px]">
            Jugadas
          </span>
        </div>
        <div className="flex flex-col gap-[16px]">
          <span className="font-extrabold text-[35px] leading-[41px]">
            {wins}
          </span>
          <span className="font-normal text-[21px] leading-[25px]">
            Victorias
          </span>
        </div>
      </div>
      {isCurrentWinner === false && (
        <div className="mb-[45px]">
          <span className="font-normal text-[19px] leading-[22px]">
            La palabra era: <b>{currentWord}</b>
          </span>
        </div>
      )}
      <div className="flex flex-col gap-[19px] mb-[41px]">
        <span className="font-normal text-[19px] leading-[22px]">
          SIGUIENTE PALABRA
        </span>
        <span className="font-bold text-[24px] leading-[28px]">{timeLeft}</span>
      </div>
      <div className="mb-[24px]">
        <button
          onClick={() => toggleModal()}
          className="w-[263px] h-[50px] rounded-[5px] bg-green-inPosition"
        >
          <span className=" font-extrabold text-[28px] leading-[33px] text-white ">
            Aceptar
          </span>
        </button>
      </div>
    </div>
  );
};
