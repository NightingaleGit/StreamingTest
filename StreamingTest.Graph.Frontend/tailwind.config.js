/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,html}"],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      "header-background": "#26282B",
      "signal-active-default": "#3375D6",
      "signal-active-dark": "#336DC6",
      "signal-active-darkest": "#3367B5",
      "signal-active-light": "#334e64",
      "signal-active-lightest": "rgba(255, 255, 255, .06)",
      "signal-positive-default": "#33A03E",
      "signal-positive-dark": "#33953D",
      "signal-positive-darkest": "#338A3C",
      "signal-negative-default": "#D6333E",
      "signal-negative-dark": "#C6333D",
      "signal-negative-darkest": "#B5333C",
      "background": "#161617",
      "background-content": "#232324",

      "text-primary": "#c9cccf",
      "text-secondary": "#969c9d",
      "text-secondary-light": "#969da0",

      "field-background-default": "#2c2c2d",
      "field-background-hover": "#1e1d1e",
      "field-background-disabled": "#333",

      "field-border-default": "rgba(0, 0, 0, .03)",
      "field-border-hover":  "#334e64",
      "field-border-active": "#3375D6",
  }
    ,
    fontFamily:  {
      body: ['"Segoe_UI"','Tahoma','Geneva','Verdana','sans-serif'] 
    },
  plugins: [],
  }
}
