/** @type {import('tailwindcss').Config} */
module.exports = {
  // Pas deze paden aan naar waar jouw bestanden staan (bijv. src/ of app/)
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Hier koppel je de CSS-variabele aan de Tailwind-naam
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
};