import React from "react";
import { Modal } from "src/components";
import { useModal } from "src/hooks";
import { useUserDataStore } from "src/stores";

export const HowToPlay: React.FC = () => {
  const { isModalOpen, toggleModal } = useModal();
  const { isFirtsTime, themeMode } = useUserDataStore();

  React.useEffect(() => {
    !isModalOpen && isFirtsTime && toggleModal();
  }, [isFirtsTime, isModalOpen, toggleModal]);

  return (
    <>
      <Modal
        isModalOpen={isModalOpen}
        children={<ModalContent toggleModal={toggleModal} />}
      />
      <button onClick={() => toggleModal()} className="h-full">
        <img
          src={
            themeMode === "light"
              ? "images/icons/question_icon.svg"
              : "images/icons/question_icon_dark.svg"
          }
          alt="question_icon"
        />
      </button>
    </>
  );
};

const ModalContent: React.FC<{ toggleModal: () => void }> = ({
  toggleModal,
}) => {
  const { setFirtsTime, isFirtsTime } = useUserDataStore();

  const examples: {
    cats: { word: string; exampleLetter: string; styleBox: string };
    vowel: { word: string; exampleLetter: string; styleBox: string };
    singing: { word: string; exampleLetter: string; styleBox: string };
  } = {
    cats: { word: "GATOS", exampleLetter: "G", styleBox: "inPosition" },
    vowel: { word: "VOCAL", exampleLetter: "C", styleBox: "notPosition" },
    singing: { word: "CANTO", exampleLetter: "O", styleBox: "wrong" },
  };

  const ExamplesBoxs: React.FC<{
    words: string[];
    exampleWord: string;
    styleBox: string;
  }> = ({ words, exampleWord, styleBox }) => {
    return (
      <>
        {words.map((letter, i) =>
          exampleWord === letter ? (
            <ExampleBox key={i} styleBox={styleBox} letter={letter} />
          ) : (
            <ExampleBox key={i} letter={letter} styleBox={"example_box"} />
          )
        )}
      </>
    );
  };

  const ExampleBox: React.FC<{ letter: string; styleBox: string }> = ({
    styleBox,
    letter,
  }) => (
    <div className={`box_word ${styleBox}  `}>
      <span className="font-bold text-[35px] leading-[41px] ">{letter}</span>
    </div>
  );

  const handlePlayButton = () => {
    isFirtsTime && setFirtsTime(false);
    toggleModal();
  };

  return (
    <div className="w-[546px] h-[1018px]  bg-gray-smoke-transparent  border border-solid  border-black rounded-[15px] pt-[56px] flex flex-col items-center gap-[32px] mt-[15%] dark:bg-blue-dark dark:text-white dark:border-gray-border">
      <span className="font-extrabold text-[35px] leading-[41px] text-center ">
        Cómo jugar
      </span>
      <div className=" pl-[42px] ">
        <div className=" w-[478px] h-[147px] mr-[26px] flex flex-col justify-between text_body">
          <span>Adivina la palabra oculta en cinco intentos.</span>
          <span>Cada intento debe ser una palabra válida de 5 letras.</span>
          <span>
            Después de cada intento el color de las letras cambia para mostrar
            qué tan cerca estás de acertar la palabra.
          </span>
        </div>
        <div className=" mt-[16px] h-[100%]">
          <span className="font-bold text-[19px] leading-[22px]">Ejemplos</span>
          <div className="flex gap-[11px] mt-[26px] ml-[13px] mb-[19px] ">
            <ExamplesBoxs
              words={examples.cats.word.split("")}
              exampleWord={examples.cats.exampleLetter}
              styleBox={examples.cats.styleBox}
            />
          </div>
          <span className="text_body">
            La letra <b>G</b> está en la palabra y en la posición correcta.
          </span>
          <div className="flex gap-[11px] mt-[23px] ml-[13px] mb-[19px]">
            <ExamplesBoxs
              words={examples.vowel.word.split("")}
              exampleWord={examples.vowel.exampleLetter}
              styleBox={examples.vowel.styleBox}
            />
          </div>
          <span className="text_body">
            La letra <b>C</b> está en la palabra pero en la posición incorrecta.
          </span>
          <div className="flex gap-[11px] mt-[29px] ml-[13px] mb-[29px]">
            <ExamplesBoxs
              words={examples.singing.word.split("")}
              exampleWord={examples.singing.exampleLetter}
              styleBox={examples.singing.styleBox}
            />
          </div>
          <span className="text_body">
            La letra <b>O</b> no está en la palabra.
          </span>
          <div className="mt-[36px]">
            <span className="text_body ">
              Puede haber letras repetidas. Las pistas son independientes para
              cada letra.
            </span>
          </div>
          <div className=" w-[332px] h-[52px] mt-[31px] ml-[57px] ">
            <span className="text_body">
              ¡Una palabra nueva cada 5 minutos!
            </span>
          </div>
          <div className="w-full ml-[92px] mr-[149px] mt-[15px]">
            <button
              onClick={() => handlePlayButton()}
              className="bg-green-inPosition rounded-[5px] w-[263px] h-[50px] text-center"
            >
              <span className=" font-extrabold text-[28px] leading-[33px] text-white ">
                !JUGAR¡
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
