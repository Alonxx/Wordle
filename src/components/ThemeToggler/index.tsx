import { useUserDataStore } from "src/stores";

export const ThemeToggler: React.FC = () => {
  const { setThemeMode, themeMode } = useUserDataStore();

  const handleChangeToggler = () => {
    setThemeMode(themeMode === "dark" ? "light" : "dark");
  };

  return (
    <label htmlFor="toggle-theme" className="cursor-pointer relative ">
      <input
        type="checkbox"
        id="toggle-theme"
        className="sr-only"
        checked={themeMode === "light"}
        onChange={() => handleChangeToggler()}
      />
      <div className="toggle_bg h-[30px] w-[60px] rounded-full" />
    </label>
  );
};
