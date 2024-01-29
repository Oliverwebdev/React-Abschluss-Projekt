import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig(({ command }) => {
  const config = {
    plugins: [react()],
    base:
      command === "serve"
        ? "/React-Abschluss-Projekt/"
        : "/React-Abschluss-Projekt/",
  };
  return config;
});
