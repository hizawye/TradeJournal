/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  important: true, // This ensures Tailwind classes override Material-UI styles
  corePlugins: {
    preflight: false, // Disable Tailwind's reset to avoid conflicts with MUI
  },
  // Add more specific utility classes for MUI integration
  theme: {
    extend: {
      spacing: {
        '2': '8px',
        '3': '12px',
        '4': '16px',
        '8': '32px',
      },
    },
  },
}
