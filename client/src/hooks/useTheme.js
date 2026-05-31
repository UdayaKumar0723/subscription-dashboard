import { useEffect } from "react";
import { useAuthStore } from "../store/authStore";

export const useTheme = () => {
  const theme = useAuthStore((state) => state.theme);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return theme;
};
