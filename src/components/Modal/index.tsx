import ReactDOM from "react-dom";

interface Props {
  children: React.ReactNode;
  isModalOpen: boolean;
}

export const Modal: React.FunctionComponent<Props> = ({
  isModalOpen,
  children,
}) => {
  const modal = (
    <div className="fixed z-50 w-[100%] h-[100%] left-0 top-0 overflow-auto block bg-gray-smoke-transparent dark:bg-blue-dark-transparent">
      <div className="w-full h-full flex justify-center items-center justify-items-center m-auto">
        {children}
      </div>
    </div>
  );

  return isModalOpen ? ReactDOM.createPortal(modal, document.body) : null;
};
