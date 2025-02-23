// import { useTheme } from '../contexts/ThemeContext';
// import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';

// function ThemeToggle() {
//   const { darkMode, toggleTheme } = useTheme();

//   return (
//     <button
//       onClick={toggleTheme}
//       className="rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
//       aria-label="Toggle theme"
//     >
//       {darkMode ? (
//         <SunIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
//       ) : (
//         <MoonIcon className="h-5 w-5 text-gray-500" />
//       )}
//     </button>
//   );
// }

// export default ThemeToggle




import { useTheme } from '../contexts/ThemeContext';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';

function ThemeToggle() {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="rounded-lg p-2 hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
      aria-label="Toggle theme"
    >
      {darkMode ? (
        <SunIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
      ) : (
        <MoonIcon className="h-5 w-5 text-gray-500" />
      )}
    </button>
  );
}

export default ThemeToggle;
