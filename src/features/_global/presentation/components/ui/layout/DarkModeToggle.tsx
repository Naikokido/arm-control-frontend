import { useEffect, useState } from 'react';
import { RiMoonLine, RiSunLine } from '@remixicon/react';

interface DarkModeToggleProps {
  size?: string;
  textColorMoon?: string;
  textColorSun?: string;
}

const DarkModeToggle: React.FC<DarkModeToggleProps> = ({
  size = 'h-5 w-5',
  textColorMoon = 'text-gray-100',
  textColorSun = 'text-gray-100',
}) => {
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('theme') === 'dark');

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.add('dark:bg-slate-800');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.remove('dark:bg-slate-800');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return darkMode ? (
    <RiMoonLine
      onClick={toggleDarkMode}
      className={`${size} ${textColorMoon} cursor-pointer rounded-full dark:bg-transparent`}
    />
  ) : (
    <RiSunLine
      onClick={toggleDarkMode}
      className={`${size} ${textColorSun} cursor-pointer rounded-full bg-transparent`}
    />
  );
};

export default DarkModeToggle;
