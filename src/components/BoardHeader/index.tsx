import { HowToPlay, Statistics, ThemeToggler } from "src/components";

export const BoardHeader: React.FC = () => {
  return (
    <div className="w-[638px] h-[84px] bg-gray-smoke rounded-[15px] flex flex-row items-center justify-between mt-[83px] dark:bg-blue-dark-light ">
      <div className="pl-[22px] pt-[28px] pb-[22px]">
        <HowToPlay />
      </div>
      <div className=" ml-[77px] text-center">
        <span className="font-semibold text-[40px] leading-[47px] text-center tracking-[0.075em] text-black-blue dark:text-white">
          WORDLE
        </span>
      </div>
      <div className=" pr-[20px] py-[27px] flex gap-[6.52px] items-center">
        <Statistics />
        <ThemeToggler />
      </div>
    </div>
  );
};
