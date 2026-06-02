import { Moon, Sun } from "lucide-react";
import { useTheme } from "../hooks/use-theme";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  // Toggle between light and dark themes
  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else if (theme === "dark") {
      setTheme("light");
    } else {
      // If "system", determine the next theme based on current preference
      const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setTheme(isDark ? "light" : "dark");
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors text-zinc-500 dark:text-zinc-400"
      aria-label="Toggle theme"
    >
      {/* Dynamic icon based on current state */}
      {theme === "light" ? (
        <Moon size={20} />
      ) : theme === "dark" ? (
        <Sun size={20} />
      ) : (
        // For "system", show the icon of what it WOULD switch to
        window.matchMedia("(prefers-color-scheme: dark)").matches ? <Sun size={20} /> : <Moon size={20} />
      )}
    </button>
  );
}
